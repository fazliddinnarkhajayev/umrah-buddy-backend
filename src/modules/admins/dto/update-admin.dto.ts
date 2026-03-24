import {
  IsIn,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from "class-validator";

export class UpdateAdminDto {
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  username!: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  first_name?: string | null;

  @IsOptional()
  @IsString()
  last_name?: string | null;

  @IsOptional()
  @IsString()
  middle_name?: string | null;

  @IsOptional()
  @IsString()
  region_id?: string;

  @IsOptional()
  @IsString()
  district_id?: string;

  @IsOptional()
  @IsIn(["STAFF", "SUPER_ADMIN"])
  role?: "STAFF" | "SUPER_ADMIN";
}
