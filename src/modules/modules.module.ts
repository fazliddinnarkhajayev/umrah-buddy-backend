import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { ReferencesModule } from './references/references.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AdminsModule, ReferencesModule, AuthModule, UsersModule],
})
export class ModulesModule { }
