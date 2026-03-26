import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { ReferencesModule } from './references/references.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PilgrimsModule } from './pilgrims/pilgrims.module';

@Module({
  imports: [AdminsModule, ReferencesModule, AuthModule, UsersModule, PilgrimsModule],
})
export class ModulesModule { }
