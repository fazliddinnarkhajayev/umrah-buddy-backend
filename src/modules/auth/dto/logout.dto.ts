import { IsString, MinLength } from 'class-validator';

export class LogoutDto {
  @IsString()
  @MinLength(1)
  refresh_token!: string;
}
