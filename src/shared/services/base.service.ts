import { BaseDao } from '../dao/base.dao';

export abstract class BaseService<T extends { id: string }> {
  protected constructor(protected readonly dao: BaseDao<T>) { }

  findById(id: string): Promise<T | undefined> {
    return this.dao.findById(id);
  }

  findAll(): Promise<T[]> {
    return this.dao.findMany();
  }

  create(payload: Partial<T>): Promise<T> {
    return this.dao.insert(payload);
  }

  update(id: string, payload: Partial<T>): Promise<T | undefined> {
    return this.dao.updateById(id, payload);
  }

  remove(id: string): Promise<boolean> {
    return this.dao.deleteById(id);
  }
}
