import { IsBoolean } from 'class-validator';

export class BlockUnblockDto {
  @IsBoolean()
  is_blocked!: boolean;
}
