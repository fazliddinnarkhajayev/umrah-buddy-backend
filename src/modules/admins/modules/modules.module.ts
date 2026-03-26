import { Module } from '@nestjs/common';
import { AgenciesModule } from './agencies/agencies.module';
import { PilgrimsModule } from './pilgrims/pilgrims.module';

@Module({
  imports: [AgenciesModule, PilgrimsModule],
  exports: [],
})
export class AdminsModulesModule { }
