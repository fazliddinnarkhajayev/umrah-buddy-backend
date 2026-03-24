import {
  IsIn,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from "class-validator";

export class CreateAdminDto {
  @IsPhoneNumber()
  phone!: string;

  @IsString()
  username!: string;

  @IsString()
  @MinLength(6)
  password!: string;

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
  region_id?: string;

  @IsOptional()
  @IsString()
  district_id?: string;

  @IsOptional()
  @IsIn(["STAFF", "SUPER_ADMIN"])
  role?: "STAFF" | "SUPER_ADMIN";
}
