import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Controller('references/districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Post()
  async create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtsService.create(createDistrictDto);
  }

  @Get()
  async findAll() {
    return this.districtsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.districtsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDistrictDto: UpdateDistrictDto) {
    return this.districtsService.update(id, updateDistrictDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.districtsService.remove(id);
  }
}
