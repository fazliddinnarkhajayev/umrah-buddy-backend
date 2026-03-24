import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AdminAuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('admins/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.adminAuthService.login(dto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.adminAuthService.refreshToken(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Body() dto: LogoutDto) {
    return this.adminAuthService.logout(dto);
  }
}
