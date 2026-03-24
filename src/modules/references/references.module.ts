import { Module } from '@nestjs/common';
import { ReferencesService } from './references.service';
import { ReferencesController } from './references.controller';
import { ReferencesModulesModule } from './modules/modules.module';

@Module({
  imports: [ReferencesModulesModule],
  providers: [ReferencesService],
  controllers: [ReferencesController],
})
export class ReferencesModule {}
