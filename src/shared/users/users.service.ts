import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import {
  FindUsersFilter,
  RegisterType,
  SharedUserRecord,
  UserRole,
  UsersDao,
} from './users.dao';

export type { SharedUserRecord, UserRole, RegisterType, FindUsersFilter } from './users.dao';

export interface CreateSharedUserInput {
  phone: string;
  password?: string | null;
  role: UserRole;
  register_type: RegisterType;
  first_name?: string | null;
  last_name?: string | null;
  middle_name?: string | null;
  region?: string | null;
  district?: string | null;
  language?: string | null;
}

export interface UpdateSharedUserInput {
  phone?: string;
  password?: string | null;
  role?: UserRole;
  register_type?: RegisterType;
  first_name?: string | null;
  last_name?: string | null;
  middle_name?: string | null;
  region?: string | null;
  district?: string | null;
  language?: string | null;
}

export interface IUserServiceContract {
  find(filter?: FindUsersFilter): Promise<SharedUserRecord[]>;
  findOne(id: string, includeDeleted?: boolean): Promise<SharedUserRecord>;
  findByPhone(phone: string, includeDeleted?: boolean): Promise<SharedUserRecord | undefined>;
  create(input: CreateSharedUserInput): Promise<SharedUserRecord>;
  update(id: string, input: UpdateSharedUserInput): Promise<SharedUserRecord>;
  softDelete(id: string): Promise<{ deleted: boolean }>;
  setBlocked(id: string, blocked: boolean): Promise<SharedUserRecord>;
}

@Injectable()
export class UsersService implements IUserServiceContract {
  constructor(private readonly usersDao: UsersDao) { }

  find(filter: FindUsersFilter = {}): Promise<SharedUserRecord[]> {
    return this.usersDao.findMany(filter);
  }

  async findOne(id: string, includeDeleted = false): Promise<SharedUserRecord> {
    const user = await this.usersDao.findById(id, includeDeleted);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findByPhone(phone: string, includeDeleted = false): Promise<SharedUserRecord | undefined> {
    return this.usersDao.findByPhone(this.normalizePhone(phone), includeDeleted);
  }

  async create(input: CreateSharedUserInput): Promise<SharedUserRecord> {
    const phone = this.normalizePhone(input.phone);
    const existingUser = await this.usersDao.findByPhone(phone, true);

    if (existingUser) {
      throw new ConflictException('Phone is already registered');
    }

    const password_hash = input.password
      ? await bcrypt.hash(input.password, 10)
      : null;

    return this.usersDao.insert({
      id: randomUUID(),
      phone,
      password_hash,
      role: input.role,
      register_type: input.register_type,
      first_name: input.first_name ?? null,
      last_name: input.last_name ?? null,
      middle_name: input.middle_name ?? null,
      region: input.region ?? null,
      district: input.district ?? null,
      language: input.language ?? 'uz',
    });
  }

  async update(id: string, input: UpdateSharedUserInput): Promise<SharedUserRecord> {
    await this.findOne(id);

    const updatePayload: Partial<SharedUserRecord> = {
      updated_at: new Date(),
    };

    if (input.phone !== undefined) {
      const normalizedPhone = this.normalizePhone(input.phone);
      const existingUser = await this.usersDao.findByPhone(normalizedPhone, true);

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Phone is already registered');
      }

      updatePayload.phone = normalizedPhone;
    }

    if (input.password !== undefined) {
      updatePayload.password_hash = input.password
        ? await bcrypt.hash(input.password, 10)
        : null;
    }

    if (input.role !== undefined) {
      updatePayload.role = input.role;
    }

    if (input.register_type !== undefined) {
      updatePayload.register_type = input.register_type;
    }

    if (input.first_name !== undefined) {
      updatePayload.first_name = input.first_name;
    }

    if (input.last_name !== undefined) {
      updatePayload.last_name = input.last_name;
    }

    if (input.middle_name !== undefined) {
      updatePayload.middle_name = input.middle_name;
    }

    if (input.region !== undefined) {
      updatePayload.region = input.region;
    }

    if (input.district !== undefined) {
      updatePayload.district = input.district;
    }

    if (input.language !== undefined) {
      updatePayload.language = input.language;
    }

    const updated = await this.usersDao.updateById(id, updatePayload);

    if (!updated) {
      throw new NotFoundException('User not found');
    }

    return updated;
  }

  async softDelete(id: string): Promise<{ deleted: boolean }> {
    const deleted = await this.usersDao.softDeleteById(id);

    if (!deleted) {
      throw new NotFoundException('User not found');
    }

    return { deleted: true };
  }

  async setBlocked(id: string, blocked: boolean): Promise<SharedUserRecord> {
    const updated = await this.usersDao.setBlockedById(id, blocked);

    if (!updated) {
      throw new NotFoundException('User not found');
    }

    return updated;
  }

  private normalizePhone(phone: string): string {
    return phone.replace(/\s+/g, '');
  }
}
