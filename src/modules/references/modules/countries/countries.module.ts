import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CountriesDao } from './countries.dao';

@Module({
  providers: [CountriesService, CountriesDao],
  controllers: [CountriesController],
})
export class CountriesModule {}
