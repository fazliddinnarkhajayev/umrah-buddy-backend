import { Module } from '@nestjs/common';
import { SharedModule } from '../../../../shared/shared.module';
import { PilgrimsController } from './pilgrims.controller';
import { PilgrimsService } from './pilgrims.service';

@Module({
  imports: [SharedModule],
  controllers: [PilgrimsController],
  providers: [PilgrimsService],
})
export class PilgrimsModule { }
