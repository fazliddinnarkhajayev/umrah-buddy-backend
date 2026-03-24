import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateDistrictDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  region_id?: string;

  @IsOptional()
  @IsString()
  soato?: string;
}
