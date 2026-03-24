import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateDistrictDto {
  @IsString()
  name!: string;

  @IsUUID()
  region_id!: string;

  @IsOptional()
  @IsString()
  soato?: string;
}
