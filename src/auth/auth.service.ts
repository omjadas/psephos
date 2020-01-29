import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

  public async login(user: any): Promise<any> {
    return this.jwtService.sign({ name: user.name, sub: user.userID });
  }

  public async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByProp("email", email);
    if (user === undefined || user.password === null) {
      return null;
    }
    if (await compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
