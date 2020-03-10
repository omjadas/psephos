import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  public constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
    super({
      jwtFromRequest: JwtStrategy.cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  private static cookieExtractor(req: Request): string | null {
    let token: string | null = null;
    if (req?.cookies) {
      token = req.cookies["jwt"];
    }
    return token;
  }

  public async validate(payload: Record<string, any>): Promise<any> {
    return this.userService.findById(payload.sub);
  }
}
