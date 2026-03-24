import { IsPhoneNumber, IsIn } from 'class-validator';

export class SendOtpDto {
  @IsPhoneNumber()
  phone!: string;

  @IsIn(['SMS', 'TELEGRAM'])
  method!: 'SMS' | 'TELEGRAM';
}
