import { Injectable } from '@nestjs/common';
import { AgenciesDao, Agency } from './agencies.dao';
import { BaseService } from 'src/shared/services/base.service';

@Injectable()
export class AgenciesService extends BaseService<Agency, AgenciesDao> {
  constructor(private readonly agenciesDao: AgenciesDao) {
    super(agenciesDao);
  }

  async create(dto: Partial<Agency>) {
    return this.agenciesDao.insert({ ...dto, status: 'ACTIVE' } as Partial<Agency>);
  }

  async findRequests(pageIndex: number = 1, pageSize: number = 10) {
    return this.agenciesDao.findManyPaginated({ status: 'PENDING' } as Partial<Agency>, pageIndex, pageSize);
  }

  async approve(id: string) {
    return this.agenciesDao.updateById(id, { status: 'APPROVED' } as Partial<Agency>);
  }

  async reject(id: string) {
    return this.agenciesDao.updateById(id, { status: 'REJECTED' } as Partial<Agency>);
  }
}
