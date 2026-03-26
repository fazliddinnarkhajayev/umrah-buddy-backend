import { Injectable } from '@nestjs/common';
import { CountriesDao, Country } from './countries.dao';
import { BaseService } from 'src/shared/services/base.service';

@Injectable()
export class CountriesService extends BaseService<Country, CountriesDao> {
  constructor(private readonly countriesDao: CountriesDao) {
    super(countriesDao);
  }
}
