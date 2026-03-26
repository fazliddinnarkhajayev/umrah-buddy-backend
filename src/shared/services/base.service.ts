import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { BaseDao } from '../dao/base.dao';
import { PaginatedResult } from '../interfaces/pagination.interface';

@Injectable()
export class BaseService<T extends { id: string }, D extends BaseDao<T>> {
  constructor(protected readonly dao: D) {}

  async transaction<R>(callback: (trx: Knex.Transaction) => Promise<R>): Promise<R> {
    return this.dao.transaction(callback);
  }

  async create(payload: Partial<T>, trx?: Knex.Transaction): Promise<T> {
    return this.dao.insert(payload, trx);
  }

  async findAll(where?: Partial<T>, trx?: Knex.Transaction): Promise<T[]> {
    return this.dao.findMany(where, trx);
  }

  async findAllPaginated(
    where: Partial<T> = {},
    pageIndex: number = 1,
    pageSize: number = 10,
    trx?: Knex.Transaction,
  ): Promise<PaginatedResult<T>> {
    return this.dao.findManyPaginated(where, pageIndex, pageSize, trx);
  }

  async findOne(id: string, trx?: Knex.Transaction): Promise<T | undefined> {
    return this.dao.findById(id, trx);
  }

  async findOneBy(where: Partial<T>, trx?: Knex.Transaction): Promise<T | undefined> {
    return this.dao.findOne(where, trx);
  }

  async update(id: string, payload: Partial<T>, trx?: Knex.Transaction): Promise<T | undefined> {
    return this.dao.updateById(id, payload, trx);
  }

  async delete(id: string, trx?: Knex.Transaction): Promise<boolean> {
    return this.dao.deleteById(id, trx);
  }

  // Alias for delete to match common NestJS conventions
  async remove(id: string, trx?: Knex.Transaction): Promise<boolean> {
    return this.delete(id, trx);
  }
}
