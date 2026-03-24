import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '../../../../shared/shared.module';
import { AdminAuthController } from './auth.controller';
import { AdminAuthService } from './auth.service';

@Module({
  imports: [
    SharedModule,
    // JwtModule is registered without a default secret here because AdminAuthService
    // signs each token explicitly using the ACCESS_TOKEN_SECRET / REFRESH_TOKEN_SECRET
    // environment variables via ConfigService.
    JwtModule.register({}),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
})
export class AdminAuthModule { }
