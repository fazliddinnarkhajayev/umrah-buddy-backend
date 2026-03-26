import { Module } from '@nestjs/common';
import { PilgrimsController } from './pilgrims.controller';
import { PilgrimsService } from './pilgrims.service';
import { PilgrimsDao } from 'src/shared/dao/piligrims.dao';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [PilgrimsController],
  providers: [PilgrimsService, PilgrimsDao],
  exports: [PilgrimsService],
})
export class PilgrimsModule {}
