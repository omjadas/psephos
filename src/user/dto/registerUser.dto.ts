import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class RegisterUserDTO {
  @IsString()
  @IsNotEmpty()
  public readonly name!: string;

  @IsString()
  @IsEmail()
  public readonly email!: string;

  @IsString()
  @IsNotEmpty()
  public readonly password!: string;
}
