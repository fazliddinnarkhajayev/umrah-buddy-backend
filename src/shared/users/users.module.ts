import { Module } from '@nestjs/common';
import { UsersDao } from './users.dao';
import { UsersService } from './users.service';

@Module({
  providers: [UsersDao, UsersService],
  exports: [UsersDao, UsersService],
})
export class UsersModule { }
