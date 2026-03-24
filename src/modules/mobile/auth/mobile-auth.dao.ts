import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { randomUUID } from 'crypto';
import { KNEX_CONNECTION } from '../../../core/database/database.constants';

export interface OtpCodeRecord {
  id: string;
  phone: string;
  code: string;
  method: 'sms' | 'telegram';
  expires_at: Date;
  verified_at: Date | null;
  created_at: Date;
}

@Injectable()
export class MobileAuthDao {
  constructor(@Inject(KNEX_CONNECTION) private readonly db: Knex) { }

  async createOtp(phone: string, code: string, method: 'sms' | 'telegram', expiresAt: Date): Promise<OtpCodeRecord> {
    const [record] = await this.db<OtpCodeRecord>('otp_codes')
      .insert({
        id: randomUUID(),
        phone,
        code,
        method,
        expires_at: expiresAt,
        verified_at: null,
      })
      .returning('*');

    return record;
  }

  async findValidOtp(phone: string, code: string): Promise<OtpCodeRecord | undefined> {
    return this.db<OtpCodeRecord>('otp_codes')
      .where({ phone, code })
      .whereNull('verified_at')
      .where('expires_at', '>', this.db.fn.now())
      .orderBy('created_at', 'desc')
      .first();
  }

  async verifyOtp(id: string): Promise<void> {
    await this.db<OtpCodeRecord>('otp_codes')
      .where({ id })
      .update({ verified_at: this.db.fn.now() as unknown as Date });
  }
}
