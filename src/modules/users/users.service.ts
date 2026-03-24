import {
  Injectable,
} from '@nestjs/common';
import { UsersDao } from './users.dao';
import { Users } from './users.interface';
import { BaseService } from 'src/shared/services/base.service';


@Injectable()
export class UsersService extends BaseService<Users, UsersDao> {
  constructor(readonly usersDao: UsersDao) {
    super(usersDao);
  }

}
