import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { SharedModule } from '../../shared/shared.module';
import { AdminsModulesModule } from './modules/modules.module';
import { SundryService } from 'src/shared/services/sundry.service';
import { AdminsDao } from 'src/shared/dao/admins.dao';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SharedModule, AdminsModulesModule, UsersModule],
  controllers: [AdminsController],
  providers: [AdminsService, SundryService, AdminsDao],
})
export class AdminsModule { }
