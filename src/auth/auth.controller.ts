import { Body, Controller, Get, HttpCode, HttpStatus, Post, Redirect, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ClearCookies, SetCookies } from "@nestjsplus/cookies";
import { Request } from "../interfaces/Request";
import { RegisterUserDTO } from "../user/dto/registerUser.dto";
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

  @Post("register")
  @HttpCode(200)
  @SetCookies()
  public async register(
    @Req() req: Request,
      @Body() body: RegisterUserDTO
  ): Promise<any> {
    const jwt = await this.authService.register(
      body.name,
      body.email,
      body.password
    );

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

  @Post("local")
  @HttpCode(200)
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
  @HttpCode(200)
  @Post("signout")
  public async signOut(): Promise<void> { }
}
