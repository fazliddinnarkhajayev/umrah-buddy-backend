import { Module } from '@nestjs/common';
import { PilgrimsService } from './pilgrims.service';
import { PilgrimsController } from './pilgrims.controller';
import { PilgrimsDao } from 'src/shared/dao/piligrims.dao';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [PilgrimsService, PilgrimsDao],
  controllers: [PilgrimsController],
})
export class PilgrimsModule {}
