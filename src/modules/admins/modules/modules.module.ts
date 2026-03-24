import { Module } from '@nestjs/common';
import { AdminAuthModule } from './auth/auth.module';
import { PilgrimsModule } from './pilgrims/pilgrims.module';

@Module({
  imports: [AdminAuthModule, PilgrimsModule],
  exports: [AdminAuthModule, PilgrimsModule],
})
export class AdminsModulesModule { }
