import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../../shared/guards/jwt-auth.guard';
import { Roles } from '../../../../shared/guards/roles.decorator';
import { RolesGuard } from '../../../../shared/guards/roles.guard';
import { BlockUnblockDto } from './dto/block-unblock.dto';
import { CreatePilgrimDto } from './dto/create-pilgrim.dto';
import { UpdatePilgrimDto } from './dto/update-pilgrim.dto';
import { PilgrimsService } from './pilgrims.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('STAFF', 'SUPER_ADMIN')
@Controller('admins/pilgrims')
export class PilgrimsController {
  constructor(private readonly pilgrimsService: PilgrimsService) { }

  @Get()
  list() {
    return this.pilgrimsService.list();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pilgrimsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePilgrimDto) {
    return this.pilgrimsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePilgrimDto) {
    return this.pilgrimsService.update(id, dto);
  }

  @Patch(':id/block-status')
  blockUnblock(@Param('id') id: string, @Body() dto: BlockUnblockDto) {
    return this.pilgrimsService.setBlocked(id, dto.is_blocked);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pilgrimsService.softDelete(id);
  }
}
