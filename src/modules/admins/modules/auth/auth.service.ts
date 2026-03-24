import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../../../shared/users/users.service';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

export interface AdminJwtPayload {
  user_id: string;
  type: 'ADMIN';
  role: 'STAFF' | 'SUPER_ADMIN';
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface IAdminAuthService {
  login(dto: LoginDto): Promise<LoginResponse>;
  refreshToken(dto: RefreshTokenDto): Promise<{ access_token: string }>;
  logout(dto: LogoutDto): { success: boolean };
}

@Injectable()
export class AdminAuthService implements IAdminAuthService {
  /**
   * In-memory refresh token blacklist.
   * TODO: Replace with a Redis SET using token TTL for production deployments.
   */
  private readonly blacklistedTokens = new Set<string>();

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async login(dto: LoginDto): Promise<LoginResponse> {
    // includeDeleted=true so that we can distinguish deleted vs blocked vs bad password
    const user = await this.usersService.findByPhone(dto.username, true);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Only STAFF and SUPER_ADMIN are allowed to use the admin login
    if (user.role !== 'STAFF' && user.role !== 'SUPER_ADMIN') {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Reject soft-deleted accounts
    if (user.deleted_at !== null) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Reject blocked accounts
    if (user.blocked_at !== null) {
      throw new UnauthorizedException('Account is blocked');
    }

    // Reject accounts with no password (e.g. OTP-only registrations)
    if (!user.password_hash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: AdminJwtPayload = {
      user_id: user.id,
      type: 'ADMIN',
      role: user.role,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(payload),
      this.signRefreshToken(payload),
    ]);

    return { access_token, refresh_token };
  }

  async refreshToken(dto: RefreshTokenDto): Promise<{ access_token: string }> {
    if (this.blacklistedTokens.has(dto.refresh_token)) {
      throw new UnauthorizedException('Refresh token has been invalidated');
    }

    const refreshSecret = this.getRefreshSecret();

    let payload: AdminJwtPayload;

    try {
      payload = this.jwtService.verify<AdminJwtPayload>(dto.refresh_token, {
        secret: refreshSecret,
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const newPayload: AdminJwtPayload = {
      user_id: payload.user_id,
      type: 'ADMIN',
      role: payload.role,
    };

    const access_token = await this.signAccessToken(newPayload);

    return { access_token };
  }

  logout(dto: LogoutDto): { success: boolean } {
    // Invalidate the refresh token by adding it to the blacklist.
    // TODO: For production, store in Redis with a TTL equal to the token's remaining lifetime.
    this.blacklistedTokens.add(dto.refresh_token);
    return { success: true };
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private signAccessToken(payload: AdminJwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.getAccessSecret(),
      expiresIn: '1h',
    });
  }

  private signRefreshToken(payload: AdminJwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.getRefreshSecret(),
      expiresIn: '7d',
    });
  }

  private getAccessSecret(): string {
    return this.configService.get<string>('ACCESS_TOKEN_SECRET') ?? 'change_me_access';
  }

  private getRefreshSecret(): string {
    return this.configService.get<string>('REFRESH_TOKEN_SECRET') ?? 'change_me_refresh';
  }
}
