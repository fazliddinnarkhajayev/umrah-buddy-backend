import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { MobileModule } from './mobile/mobile.module';

@Module({
  imports: [AdminsModule, MobileModule],
})
export class ModulesModule { }
