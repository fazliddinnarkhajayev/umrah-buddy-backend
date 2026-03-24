import { IsIn, IsPhoneNumber } from 'class-validator';

export class SendOtpDto {
  @IsPhoneNumber()
  phone!: string;

  @IsIn(['sms', 'telegram'])
  method!: 'sms' | 'telegram';
}
