import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../../../shared/shared.module';
import { MobileAuthController } from './mobile-auth.controller';
import { MobileAuthDao } from './mobile-auth.dao';
import { MobileAuthService } from './mobile-auth.service';

@Module({
  imports: [
    SharedModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET') ?? 'change_me_access',
        signOptions: {
          expiresIn: (configService.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m') as never,
        },
      }),
    }),
  ],
  controllers: [MobileAuthController],
  providers: [MobileAuthService, MobileAuthDao],
})
export class MobileAuthModule { }
