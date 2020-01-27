import { Controller, Get, HttpStatus, Post, Redirect, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SetCookies } from "@nestjsplus/cookies";
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
  public async googleLoginCallback(@Req() req: Request): Promise<any> {
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
}
