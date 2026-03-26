import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { DistrictsModule } from './districts/districts.module';
import { RegionsModule } from './regions/regions.module';

@Module({
  imports: [CountriesModule, DistrictsModule, RegionsModule],
})
export class ReferencesModulesModule {}
