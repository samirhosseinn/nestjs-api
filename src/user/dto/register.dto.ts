import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterDTO {
  @IsOptional()
  name?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
