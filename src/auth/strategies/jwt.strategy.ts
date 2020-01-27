import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  public constructor(configService: ConfigService) {
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
    console.log(token);
    return token;
  }

  public async validate(payload: any): Promise<any> {
    return { userId: payload.sub, username: payload.username };
  }
}
