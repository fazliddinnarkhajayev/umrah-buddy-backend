import { Injectable, NotFoundException } from '@nestjs/common';
import {
  SharedUserRecord,
  UsersService,
} from '../../shared/users/users.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

export interface IAdminsService {
  list(): Promise<SharedUserRecord[]>;
  findOne(id: string): Promise<SharedUserRecord>;
  create(dto: CreateAdminDto): Promise<SharedUserRecord>;
  update(id: string, dto: UpdateAdminDto): Promise<SharedUserRecord>;
  softDelete(id: string): Promise<{ deleted: boolean }>;
  setBlocked(id: string, isBlocked: boolean): Promise<SharedUserRecord>;
}

@Injectable()
export class AdminsService implements IAdminsService {
  constructor(private readonly usersService: UsersService) { }

  list(): Promise<SharedUserRecord[]> {
    return this.usersService.find({ roles: ['STAFF', 'SUPER_ADMIN'] });
  }

  async findOne(id: string): Promise<SharedUserRecord> {
    const user = await this.usersService.findOne(id);

    if (user.role !== 'STAFF' && user.role !== 'SUPER_ADMIN') {
      throw new NotFoundException('Admin user not found');
    }

    return user;
  }

  create(dto: CreateAdminDto): Promise<SharedUserRecord> {
    return this.usersService.create({
      phone: dto.phone,
      password: dto.password,
      role: dto.role ?? 'STAFF',
      register_type: 'MANUAL',
      first_name: dto.first_name,
      last_name: dto.last_name,
      middle_name: dto.middle_name,
      region: dto.region,
      district: dto.district,
      language: dto.language,
    });
  }

  async update(id: string, dto: UpdateAdminDto): Promise<SharedUserRecord> {
    await this.findOne(id);

    return this.usersService.update(id, {
      phone: dto.phone,
      password: dto.password,
      role: dto.role,
      first_name: dto.first_name,
      last_name: dto.last_name,
      middle_name: dto.middle_name,
      region: dto.region,
      district: dto.district,
      language: dto.language,
    });
  }

  async softDelete(id: string): Promise<{ deleted: boolean }> {
    await this.findOne(id);
    return this.usersService.softDelete(id);
  }

  async setBlocked(id: string, isBlocked: boolean): Promise<SharedUserRecord> {
    await this.findOne(id);
    return this.usersService.setBlocked(id, isBlocked);
  }
}
