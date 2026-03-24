import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtPayload } from '../../../shared/auth/jwt.strategy';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { LogoutDto } from './dto/logout.dto';
import { RegisterPilgrimDto } from './dto/register-pilgrim.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { MobileAuthService } from './mobile-auth.service';

@Controller('mobile')
export class MobileAuthController {
  constructor(private readonly mobileAuthService: MobileAuthService) { }

  @Post('auth/send-otp')
  sendOtp(@Body() dto: SendOtpDto) {
    return this.mobileAuthService.sendOtp(dto);
  }

  @Post('auth/verify-otp')
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.mobileAuthService.verifyOtp(dto);
  }

  @Post('auth/register')
  register(@Body() dto: RegisterPilgrimDto) {
    return this.mobileAuthService.register(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/logout')
  logout(@Req() req: { user: JwtPayload }, @Body() _dto: LogoutDto) {
    return this.mobileAuthService.logout(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: { user: JwtPayload }) {
    return this.mobileAuthService.me(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(@Req() req: { user: JwtPayload }, @Body() dto: UpdateProfileDto) {
    return this.mobileAuthService.updateMe(req.user.sub, dto);
  }
}
