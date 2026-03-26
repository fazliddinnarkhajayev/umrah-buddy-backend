import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AgencyUsersService } from './agency-users.service';
import { CreateAgencyUserDto } from './dto/create-agency-user.dto';
import { UpdateAgencyUserDto } from './dto/update-agency-user.dto';
import { ChangeAgencyUserStatusDto } from './dto/change-agency-user-status.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Controller('admins/agencies/:agencyId/users')
export class AgencyUsersController {
  constructor(private readonly agencyUsersService: AgencyUsersService) {}

  @Post()
  async create(
    @Param('agencyId') agencyId: string,
    @Body() createDto: CreateAgencyUserDto,
  ) {
    return this.agencyUsersService.createAgencyUser(agencyId, createDto);
  }

  @Get()
  async findAll(@Param('agencyId') agencyId: string, @Query() pagination: PaginationDto) {
    return this.agencyUsersService.findByAgency(agencyId, pagination.page_index, pagination.page_size);
  }

  @Patch(':userId')
  async update(
    @Param('agencyId') agencyId: string,
    @Param('userId') userId: string,
    @Body() updateDto: UpdateAgencyUserDto,
  ) {
    return this.agencyUsersService.update(userId, updateDto);
  }

  @Patch(':userId/status')
  async changeStatus(
    @Param('agencyId') agencyId: string,
    @Param('userId') userId: string,
    @Body() dto: ChangeAgencyUserStatusDto,
  ) {
    return this.agencyUsersService.update(userId, { status: dto.status });
  }

  @Delete(':userId')
  async remove(
    @Param('agencyId') agencyId: string,
    @Param('userId') userId: string,
  ) {
    return this.agencyUsersService.remove(userId);
  }
}
