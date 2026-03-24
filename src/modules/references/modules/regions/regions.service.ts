import { Injectable } from '@nestjs/common';
import { RegionsDao } from './regions.dao';
import { Region } from './regions.dao';
import { BaseService } from 'src/shared/services/base.service';

@Injectable()
export class RegionsService extends BaseService<Region, RegionsDao> {
  constructor(private readonly regionsDao: RegionsDao) {
    super(regionsDao);
  }
}
