import { Body, Controller, Get, HttpStatus, Post, Redirect, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ClearCookies, SetCookies } from "@nestjsplus/cookies";
import { RegisterUserDTO } from "src/user/dto/registerUser.dto";
import { Request } from "../interfaces/Request";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  public constructor(private readonly authService: AuthService) { }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  public googleLogin(): void {
    // auth
  }

  @Redirect("/", HttpStatus.FOUND)
  @Get("google/callback")
  @SetCookies()
  @UseGuards(AuthGuard("google"))
  public async googleLoginCallback(@Req() req: Request): Promise<void> {
    const jwt = await this.authService.login(req.user);
    req._cookies = [
      {
        name: "jwt",
        value: jwt,
        options: {
          httpOnly: true,
        },
      },
    ];
  }

  @Redirect("/", HttpStatus.FOUND)
  @Post("register")
  @SetCookies()
  public async register(@Req() req: Request, @Body() body: RegisterUserDTO): Promise<any> {
    console.log(body);
    const jwt = await this.authService.register(body.name, body.email, body.password);
    console.log(jwt);
    req._cookies = [
      {
        name: "jwt",
        value: jwt,
        options: {
          httpOnly: true,
        },
      },
    ];
  }

  @Redirect("/", HttpStatus.FOUND)
  @Post("local")
  @SetCookies()
  @UseGuards(AuthGuard("local"))
  public async signIn(@Req() req: Request): Promise<any> {
    const jwt = await this.authService.login(req.user);
    req._cookies = [
      {
        name: "jwt",
        value: jwt,
        options: {
          httpOnly: true,
        },
      },
    ];
  }

  @ClearCookies("jwt")
  @Get("signout")
  public async signOut(): Promise<void> { }
}
