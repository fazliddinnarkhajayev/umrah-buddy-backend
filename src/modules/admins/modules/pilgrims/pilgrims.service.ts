import { Injectable, NotFoundException } from '@nestjs/common';
import {
  SharedUserRecord,
  UsersService,
} from '../../../../shared/users/users.service';
import { CreatePilgrimDto } from './dto/create-pilgrim.dto';
import { UpdatePilgrimDto } from './dto/update-pilgrim.dto';

export interface IPilgrimsService {
  list(): Promise<SharedUserRecord[]>;
  findOne(id: string): Promise<SharedUserRecord>;
  create(dto: CreatePilgrimDto): Promise<SharedUserRecord>;
  update(id: string, dto: UpdatePilgrimDto): Promise<SharedUserRecord>;
  softDelete(id: string): Promise<{ deleted: boolean }>;
  setBlocked(id: string, isBlocked: boolean): Promise<SharedUserRecord>;
}

@Injectable()
export class PilgrimsService implements IPilgrimsService {
  constructor(private readonly usersService: UsersService) { }

  list(): Promise<SharedUserRecord[]> {
    return this.usersService.find({ role: 'PILGRIM' });
  }

  async findOne(id: string): Promise<SharedUserRecord> {
    const user = await this.usersService.findOne(id);

    if (user.role !== 'PILGRIM') {
      throw new NotFoundException('Pilgrim not found');
    }

    return user;
  }

  create(dto: CreatePilgrimDto): Promise<SharedUserRecord> {
    return this.usersService.create({
      phone: dto.phone,
      password: dto.password,
      role: 'PILGRIM',
      register_type: dto.register_type ?? 'MANUAL',
      first_name: dto.first_name,
      last_name: dto.last_name,
      middle_name: dto.middle_name,
      region: dto.region,
      district: dto.district,
      language: dto.language,
    });
  }

  async update(id: string, dto: UpdatePilgrimDto): Promise<SharedUserRecord> {
    await this.findOne(id);

    return this.usersService.update(id, {
      phone: dto.phone,
      password: dto.password,
      register_type: dto.register_type,
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
