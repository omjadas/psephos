import { NotFoundException, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, ID, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
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
  public async getUser(@Args({ name: "id", type: () => ID }) id: string): Promise<User> {
    const user = await this.userService.findById(id);
    if (user === undefined) {
      throw new NotFoundException();
    }
    return user;
  }

  @Query(_returns => User, { name: "me" })
  @UseGuards(GqlAuthGuard)
  public async getCurrentUser(@CurrentUser() user: User): Promise<User> {
    const user2 = await this.userService.findById(user.uuid);
    if (user2 === undefined) {
      throw new NotFoundException();
    }
    return user2;
  }

  @ResolveField()
  public email(@CurrentUser() user: User, @Parent() parent: User): string {
    if (user.uuid === parent.uuid) {
      return parent.email;
    } else {
      throw new UnauthorizedException();
    }
  }
}
