import { Injectable } from '@nestjs/common';
import { DistrictsDao } from './districts.dao';
import { District } from './districts.dao';
import { BaseService } from 'src/shared/services/base.service';

@Injectable()
export class DistrictsService extends BaseService<District, DistrictsDao> {
  constructor(private readonly districtsDao: DistrictsDao) {
    super(districtsDao);
  }
}
