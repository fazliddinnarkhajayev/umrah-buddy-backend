import { IsIn, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreatePilgrimDto {
  @IsPhoneNumber()
  phone!: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsIn(['MANUAL', 'GOOGLE'])
  register_type?: 'MANUAL' | 'GOOGLE';

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
}
