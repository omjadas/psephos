import { NotFoundException, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, Parent, Query, ResolveProperty, Resolver } from "@nestjs/graphql";
import { Int } from "type-graphql";
import { GqlAuthGuard } from "../auth/strategies/jwt.gql.strategy";
import { CurrentUser } from "./decorators/currentUser";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(User)
export class UserResolver {
  public constructor(
    private readonly userService: UserService
  ) { }

  @Query(_returns => User, { name: "user" })
  @UseGuards(GqlAuthGuard)
  public async getUser(@Args({ name: "id", type: () => Int }) id: number): Promise<User> {
    const user = await this.userService.findById(id);
    if (user === undefined) {
      throw new NotFoundException();
    }
    return user;
  }

  @Query(_returns => User, { name: "me" })
  @UseGuards(GqlAuthGuard)
  public async getCurrentUser(@CurrentUser() user: User): Promise<User> {
    const user2 = await this.userService.findById(user.id);
    if (user2 === undefined) {
      throw new NotFoundException();
    }
    return user2;
  }

  @ResolveProperty()
  public email(@CurrentUser() user: User, @Parent() parent: User): string {
    if (user.id === parent.id) {
      return parent.email;
    } else {
      throw new UnauthorizedException();
    }
  }
}
