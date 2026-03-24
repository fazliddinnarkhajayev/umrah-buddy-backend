import { Module } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { DistrictsDao } from './districts.dao';

@Module({
  providers: [DistrictsService, DistrictsDao],
  controllers: [DistrictsController],
})
export class DistrictsModule {}
