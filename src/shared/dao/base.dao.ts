import { Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from '../../core/database/database.constants';

export abstract class BaseDao<T extends { id: string }> {
  protected constructor(
    protected readonly tableName: string,
    @Inject(KNEX_CONNECTION) protected readonly db: Knex,
  ) { }

  async findById(id: string): Promise<T | undefined> {
    const record = await this.db(this.tableName).where({ id }).first();
    return record as T | undefined;
  }

  async findOne(where: Partial<T>): Promise<T | undefined> {
    const record = await this.db(this.tableName).where(where as Record<string, unknown>).first();
    return record as T | undefined;
  }

  async findMany(where: Partial<T> = {}): Promise<T[]> {
    const records = await this.db(this.tableName).where(where as Record<string, unknown>);
    return records as T[];
  }

  async insert(payload: Partial<T>): Promise<T> {
    const [record] = await this.db(this.tableName)
      .insert(payload as Record<string, unknown>)
      .returning('*');
    return record as T;
  }

  async updateById(id: string, payload: Partial<T>): Promise<T | undefined> {
    const [record] = await this.db(this.tableName)
      .where({ id })
      .update(payload as Record<string, unknown>)
      .returning('*');

    return record as T | undefined;
  }

  async deleteById(id: string): Promise<boolean> {
    const affected = await this.db(this.tableName).where({ id }).delete();
    return affected > 0;
  }
}
