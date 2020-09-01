import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  public login(user: User): Promise<string> {
    return Promise.resolve(
      this.jwtService.sign({ name: user.name, sub: user.id })
    );
  }

  public async register(
    name: string,
    email: string,
    password: string
  ): Promise<string> {
    if (await this.userService.findByProp("email", email) !== undefined) {
      throw new Error();
    }
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await hash(password, 12);
    await this.userService.save(user);
    return this.jwtService.sign({ name: user.name, sub: user.id });
  }

  public async validateUser(
    email: string,
    password: string
  ): Promise<User | null> {
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
