import { Module } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { AgenciesController } from './agencies.controller';
import { AgenciesDao } from './agencies.dao';
import { AgencyUsersModule } from './modules/agency-users/agency-users.module';

@Module({
  imports: [AgencyUsersModule],
  providers: [AgenciesService, AgenciesDao],
  controllers: [AgenciesController],
})
export class AgenciesModule {}
