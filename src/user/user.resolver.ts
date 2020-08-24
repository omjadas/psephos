import { NotFoundException, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, ID, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/strategies/jwt.gql.strategy";
import { Election } from "../election/election.entity";
import { ElectionService } from "../election/election.service";
import { CurrentUser } from "./decorators/currentUser";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(User)
export class UserResolver {
  public constructor(
    private readonly userService: UserService,
    private readonly electionService: ElectionService
  ) { }

  @Query(_returns => User, { name: "user" })
  @UseGuards(GqlAuthGuard)
  public async getUser(
    @Args({ name: "id", type: () => ID }) id: string
  ): Promise<User> {
    const user = await this.userService.findById(id);
    if (user === undefined) {
      throw new NotFoundException();
    }
    return user;
  }

  @Query(_returns => User, { name: "me" })
  @UseGuards(GqlAuthGuard)
  public async getCurrentUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @ResolveField()
  public email(
    @CurrentUser() user: User,
      @Parent() parent: User
  ): string | null {
    if (user.id === parent.id) {
      return parent.email;
    } else {
      throw new UnauthorizedException();
    }
  }

  @ResolveField()
  public createdElections(@Parent() user: User): Promise<Election[]> {
    return this.electionService.findAllByProp("creatorId", user.id);
  }
}
