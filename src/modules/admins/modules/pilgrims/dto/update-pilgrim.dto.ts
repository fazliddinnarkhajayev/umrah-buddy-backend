import { IsIn, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class UpdatePilgrimDto {
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsIn(['MANUAL', 'GOOGLE', 'OTP'])
  register_type?: 'MANUAL' | 'GOOGLE' | 'OTP';

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
