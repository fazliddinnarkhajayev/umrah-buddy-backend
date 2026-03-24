import { IsPhoneNumber, IsString, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsPhoneNumber()
  phone!: string;

  @IsString()
  @Length(4, 8)
  code!: string;
}
