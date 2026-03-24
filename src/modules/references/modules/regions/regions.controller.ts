import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Controller('references/regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  async create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @Get()
  async findAll() {
    return this.regionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.regionsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(id, updateRegionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.regionsService.remove(id);
  }
}
