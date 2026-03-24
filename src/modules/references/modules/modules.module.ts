import { Module } from '@nestjs/common';
import { DistrictsModule } from './districts/districts.module';
import { RegionsModule } from './regions/regions.module';

@Module({
  imports: [DistrictsModule, RegionsModule],
})
export class ReferencesModulesModule {}
