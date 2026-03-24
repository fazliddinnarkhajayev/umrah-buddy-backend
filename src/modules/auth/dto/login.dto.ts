import { IsIn, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsIn(['ADMIN'])
  type!: 'ADMIN';

  @IsString()
  @MinLength(1)
  username!: string;

  @IsString()
  @MinLength(1)
  password!: string;
}
