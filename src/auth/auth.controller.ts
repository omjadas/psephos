import { Controller, Get, Post, Req, UseGuards, Redirect, HttpStatus } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CookieSettings, SetCookies } from "@nestjsplus/cookies";
import { Request } from "express";
import { AuthService } from "./auth.service";

interface MyRequest extends Request {
  _cookies: CookieSettings[],
}

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
  public async googleLoginCallback(@Req() req: MyRequest): Promise<any> {
    const jwt = await this.authService.login(req.user);
    req._cookies = [
      {
        name: "jwt",
        value: JSON.stringify(jwt),
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
  public async signIn(@Req() req: MyRequest): Promise<any> {
    const jwt = await this.authService.login(req.user);
    req._cookies = [
      {
        name: "jwt",
        value: JSON.stringify(jwt),
        options: {
          httpOnly: true,
        },
      },
    ];
  }
}
