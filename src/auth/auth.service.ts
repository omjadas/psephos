import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.entity";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

  public async login(user: any): Promise<any> {
    return this.jwtService.sign({ name: user.name, sub: user.userID });
  }

  public async validateUser(email: string, password: string): Promise<User | null> {
    const users = await this.userService.find({ where: { email: email } });
    const user = users[0];
    if (user.password === null) {
      return null;
    }
    if (await compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
