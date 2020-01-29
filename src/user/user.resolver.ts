import { NotFoundException } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { Int } from "type-graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(User)
export class UserResolver {
  public constructor(
    private readonly userService: UserService
  ) { }

  @Query(_returns => User, { name: "user" })
  public async getUser(@Args({ name: "id", type: () => Int }) id: number): Promise<User> {
    const user = await this.userService.findById(id);
    if (user === undefined) {
      throw new NotFoundException();
    }
    return user;
  }
}
