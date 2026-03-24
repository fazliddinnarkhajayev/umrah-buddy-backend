import { Module } from '@nestjs/common';
import { MobileAuthModule } from './auth/mobile-auth.module';

@Module({
  imports: [MobileAuthModule],
})
export class MobileModule { }
