import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { SharedModule } from '../../shared/shared.module';
import { AdminsModulesModule } from './modules/modules.module';

@Module({
  imports: [SharedModule, AdminsModulesModule],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule { }
