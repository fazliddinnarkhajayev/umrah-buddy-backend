import { IsIn } from 'class-validator';

export class ChangeAgencyUserStatusDto {
  @IsIn(['ACTIVE', 'BLOCKED', 'DELETED'])
  status!: 'ACTIVE' | 'BLOCKED' | 'DELETED';
}
