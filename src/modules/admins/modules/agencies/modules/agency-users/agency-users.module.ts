import { Module } from '@nestjs/common';
import { AgencyUsersService } from './agency-users.service';
import { AgencyUsersController } from './agency-users.controller';
import { AgencyUsersDao } from './agency-users.dao';
import { UsersModule } from 'src/modules/users/users.module';
import { SundryService } from 'src/shared/services/sundry.service';

@Module({
  imports: [UsersModule],
  providers: [AgencyUsersService, AgencyUsersDao, SundryService],
  controllers: [AgencyUsersController],
})
export class AgencyUsersModule {}
