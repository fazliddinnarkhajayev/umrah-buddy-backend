import { IsIn, IsString, IsPhoneNumber, IsUUID, MinLength, ValidateIf } from 'class-validator';

export class RegisterDto {
  @IsIn(['MANUAL', 'GOOGLE'])
  type!: 'MANUAL' | 'GOOGLE';

  @ValidateIf((dto) => dto.type === 'MANUAL')
  @IsString()
  @MinLength(1)
  full_name?: string;

  @ValidateIf((dto) => dto.type === 'MANUAL')
  @IsPhoneNumber()
  phone?: string;

  @ValidateIf((dto) => dto.type === 'MANUAL')
  @IsUUID()
  country_id?: string;

  @ValidateIf((dto) => dto.type === 'GOOGLE')
  @IsString()
  @MinLength(1)
  google_token?: string;
}
