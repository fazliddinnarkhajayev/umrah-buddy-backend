import { IsIn, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsPhoneNumber()
  phone!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsIn(['STAFF', 'SUPER_ADMIN'])
  role?: 'STAFF' | 'SUPER_ADMIN';
}
