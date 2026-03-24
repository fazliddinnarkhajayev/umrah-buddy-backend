import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  providers: [JwtAuthGuard, RolesGuard],
  exports: [UsersModule, JwtModule, JwtAuthGuard, RolesGuard],
})
export class SharedModule { }
