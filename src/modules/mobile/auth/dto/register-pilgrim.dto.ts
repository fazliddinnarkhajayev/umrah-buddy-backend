import {
  IsIn,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class RegisterPilgrimDto {
  @IsPhoneNumber()
  phone!: string;

  @IsIn(['MANUAL', 'GOOGLE'])
  register_type!: 'MANUAL' | 'GOOGLE';

  @ValidateIf((dto: RegisterPilgrimDto) => dto.register_type === 'MANUAL')
  @IsString()
  @MinLength(6)
  password?: string;

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
