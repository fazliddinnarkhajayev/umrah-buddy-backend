import { IsString, IsOptional, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateAgencyUserDto {
  @IsString()
  username!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  first_name!: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsPhoneNumber()
  phone!: string;

  @IsOptional()
  @IsString()
  role?: string;
}
