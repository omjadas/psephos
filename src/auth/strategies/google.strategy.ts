import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { User } from "../../user/user.entity";
import { UserService } from "../../user/user.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  public constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
    super({
      clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET"),
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
      scope: ["email", "profile"],
    });
  }

  public async validate(_request: any, _accessToken: string, _refreshToken: string, profile: Profile): Promise<any> {
    if (!profile) {
      throw new BadRequestException();
    }

    let user = await this.userService.findByProp("googleId", profile.id);

    if (user === undefined) {
      user = new User();
      user.googleId = profile.id;
      user.name = profile.displayName;
      const email = profile.emails?.[0].value;
      if (email === undefined) {
        throw new BadRequestException();
      }
      user.email = email;
      this.userService.save(user);
    }

    return user;
  }
}
