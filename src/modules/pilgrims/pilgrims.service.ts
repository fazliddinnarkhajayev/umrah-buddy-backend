import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { Pilgrim, PilgrimsDao } from 'src/shared/dao/piligrims.dao';

@Injectable()
export class PilgrimsService extends BaseService<Pilgrim, PilgrimsDao> {
  constructor(private readonly pilgrimsDao: PilgrimsDao) {
    super(pilgrimsDao);
  }

  async getProfile(userId: string): Promise<Pilgrim> {
    const pilgrim = await this.pilgrimsDao.findByUserId(userId);
    if (!pilgrim) {
      throw new NotFoundException('Pilgrim profile not found');
    }
    return pilgrim;
  }
}
