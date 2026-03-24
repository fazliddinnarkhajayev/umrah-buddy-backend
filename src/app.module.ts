import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { existsSync } from 'fs';
import { CoreModule } from './core/core.module';
import { ModulesModule } from './modules/modules.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: existsSync('.env') ? '.env' : '.env.example',
    }),
    CoreModule,
    SharedModule,
    ModulesModule,
  ],
})
export class AppModule { }
