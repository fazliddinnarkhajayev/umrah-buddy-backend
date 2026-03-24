import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomInt } from 'crypto';
import { JwtPayload } from '../../../shared/auth/jwt.strategy';
import {
  SharedUserRecord,
  UsersService,
} from '../../../shared/users/users.service';
import { MobileAuthDao } from './mobile-auth.dao';
import { RegisterPilgrimDto } from './dto/register-pilgrim.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

export interface IMobileAuthService {
  sendOtp(dto: SendOtpDto): Promise<{ success: boolean }>;
  verifyOtp(dto: VerifyOtpDto): Promise<{ access_token: string; is_new_user: boolean }>;
  register(dto: RegisterPilgrimDto): Promise<{ access_token: string; user: SharedUserRecord }>;
  logout(userId: string): Promise<{ success: boolean; user_id: string }>;
  me(userId: string): Promise<SharedUserRecord>;
  updateMe(userId: string, dto: UpdateProfileDto): Promise<SharedUserRecord>;
}

@Injectable()
export class MobileAuthService implements IMobileAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mobileAuthDao: MobileAuthDao,
  ) { }

  async sendOtp(dto: SendOtpDto): Promise<{ success: boolean }> {
    const normalizedPhone = this.normalizePhone(dto.phone);
    const code = String(randomInt(100000, 999999));
    const expiryMinutes = Number(this.configService.get<string>('OTP_EXPIRY_MINUTES') ?? '5');
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    await this.mobileAuthDao.createOtp(normalizedPhone, code, dto.method, expiresAt);

    return { success: true };
  }

  async verifyOtp(dto: VerifyOtpDto): Promise<{ access_token: string; is_new_user: boolean }> {
    const normalizedPhone = this.normalizePhone(dto.phone);
    const otp = await this.mobileAuthDao.findValidOtp(normalizedPhone, dto.code);

    if (!otp) {
      throw new UnauthorizedException('Invalid or expired OTP code');
    }

    await this.mobileAuthDao.verifyOtp(otp.id);

    let user = await this.usersService.findByPhone(normalizedPhone);
    let isNewUser = false;

    if (!user) {
      user = await this.usersService.create({
        phone: normalizedPhone,
        password: null,
        role: 'PILGRIM',
        register_type: 'OTP',
      });
      isNewUser = true;
    }

    if (user.blocked_at) {
      throw new ForbiddenException('User is blocked');
    }

    const access_token = await this.buildAccessToken(user);

    return {
      access_token,
      is_new_user: isNewUser,
    };
  }

  async register(dto: RegisterPilgrimDto): Promise<{ access_token: string; user: SharedUserRecord }> {
    const normalizedPhone = this.normalizePhone(dto.phone);
    const existingUser = await this.usersService.findByPhone(normalizedPhone, true);

    if (existingUser) {
      throw new ConflictException('Phone is already registered');
    }

    const user = await this.usersService.create({
      phone: normalizedPhone,
      password: dto.password,
      role: 'PILGRIM',
      register_type: dto.register_type,
      first_name: dto.first_name,
      last_name: dto.last_name,
      middle_name: dto.middle_name,
      region: dto.region,
      district: dto.district,
      language: dto.language,
    });

    const access_token = await this.buildAccessToken(user);

    return {
      access_token,
      user,
    };
  }

  async logout(userId: string): Promise<{ success: boolean; user_id: string }> {
    return {
      success: true,
      user_id: userId,
    };
  }

  me(userId: string): Promise<SharedUserRecord> {
    return this.usersService.findOne(userId);
  }

  updateMe(userId: string, dto: UpdateProfileDto): Promise<SharedUserRecord> {
    return this.usersService.update(userId, {
      phone: dto.phone,
      password: dto.password,
      first_name: dto.first_name,
      last_name: dto.last_name,
      middle_name: dto.middle_name,
      region: dto.region,
      district: dto.district,
      language: dto.language,
    });
  }

  private async buildAccessToken(user: SharedUserRecord): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
    };

    return this.jwtService.signAsync(payload);
  }

  private normalizePhone(phone: string): string {
    return phone.replace(/\s+/g, '');
  }
}
