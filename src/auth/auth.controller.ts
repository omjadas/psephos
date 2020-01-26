import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  public constructor(private readonly authService: AuthService) { }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  public googleLogin(): void {
    // auth
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  public async googleLoginCallback(@Req() req: Request): Promise<any> {
    return this.authService.login(req.user);
  }

  @Post("local")
  @UseGuards(AuthGuard("local"))
  public async signIn(@Req() req: Request): Promise<any> {
    return this.authService.login(req.user);
  }
}
