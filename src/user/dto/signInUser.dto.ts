import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInUserDTO {
  @IsString()
  @IsEmail()
  public readonly email!: string;

  @IsString()
  @IsNotEmpty()
  public readonly password!: string;
}
