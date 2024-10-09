import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDTO {
  name?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
