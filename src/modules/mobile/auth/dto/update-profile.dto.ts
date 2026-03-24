import { IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  first_name?: string | null;

  @IsOptional()
  @IsString()
  last_name?: string | null;

  @IsOptional()
  @IsString()
  middle_name?: string | null;

  @IsOptional()
  @IsString()
  region?: string | null;

  @IsOptional()
  @IsString()
  district?: string | null;

  @IsOptional()
  @IsString()
  language?: string;
}
