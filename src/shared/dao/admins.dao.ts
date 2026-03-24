import { Inject, Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { KNEX_CONNECTION } from "../../core/database/database.constants";
import { TABLE_NAMES } from "../constants/table-names";
import { AdminUser } from "src/modules/admins/interfaces/admin-user.interface";
import { BaseDao } from "./base.dao";

@Injectable()
export class AdminsDao extends BaseDao<AdminUser> {
  constructor(@Inject(KNEX_CONNECTION) db: Knex) {
    super(TABLE_NAMES.ADMINS, db);
  }

 
}
