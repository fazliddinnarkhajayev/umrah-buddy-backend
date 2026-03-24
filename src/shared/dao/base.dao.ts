import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/core/database/database.constants';

@Injectable()
export class BaseDao<T extends { id: string }> {
  protected readonly db: Knex;

  constructor(
    protected readonly tableName: string,
    @Inject(KNEX_CONNECTION) db: Knex,
  ) {
    this.db = db;
  }

  protected qb(trx?: Knex.Transaction): Knex.QueryBuilder {
    return trx ? trx(this.tableName) : this.db(this.tableName);
  }

  async transaction<R>(callback: (trx: Knex.Transaction) => Promise<R>): Promise<R> {
    return this.db.transaction(callback);
  }

  async findById(id: string, trx?: Knex.Transaction): Promise<T | undefined> {
    const record = await this.qb(trx).where({ id }).first();
    return record as T | undefined;
  }

  async findOne(where: Partial<T>, trx?: Knex.Transaction): Promise<T | undefined> {
    const record = await this.qb(trx).where(where as Record<string, unknown>).first();
    return record as T | undefined;
  }

  async findMany(where: Partial<T> = {}, trx?: Knex.Transaction): Promise<T[]> {
    const records = await this.qb(trx).where(where as Record<string, unknown>);
    return records as T[];
  }

  async exists(where: Partial<T>, trx?: Knex.Transaction): Promise<boolean> {
    const record = await this.qb(trx).where(where as Record<string, unknown>).first();
    return !!record;
  }

  async insert(payload: Partial<T>, trx?: Knex.Transaction): Promise<T> {
    const [record] = await this.qb(trx)
      .insert(payload as Record<string, unknown>)
      .returning('*');
    return record as T;
  }

  async updateById(id: string, payload: Partial<T>, trx?: Knex.Transaction): Promise<T | undefined> {
    const [record] = await this.qb(trx)
      .where({ id })
      .update(payload as Record<string, unknown>)
      .returning('*');

    return record as T | undefined;
  }

  async deleteById(id: string, trx?: Knex.Transaction): Promise<boolean> {
    const affected = await this.qb(trx).where({ id }).delete();
    return affected > 0;
  }
}
