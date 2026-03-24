import { IsString, IsOptional } from 'class-validator';

export class CreateRegionDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  soato?: string;
}
