import { IsString, IsOptional } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  soato?: string;
}
