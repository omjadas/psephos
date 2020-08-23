import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import slugify from "slugify";
import { CurrentUser } from "src/user/decorators/currentUser";
import { User } from "src/user/user.entity";
import { GqlAuthGuard } from "../auth/strategies/jwt.gql.strategy";
import { Election } from "./election.entity";
import { ElectionService } from "./election.service";

@Resolver(Election)
export class ElectionResolver {
  public constructor(
    private readonly electionService: ElectionService
  ) { }

  @Query(_returns => Election, { name: "election" })
  @UseGuards(GqlAuthGuard)
  public async getElection(
    @Args("slug") slug: string
  ): Promise<Election> {
    const election = await this.electionService.findByProp("slug", slug);
    if (election === undefined) {
      throw new NotFoundException();
    }
    return election;
  }

  @Query(_returns => [Election], { name: "elections" })
  @UseGuards(GqlAuthGuard)
  public getElections(): Promise<Election[]> {
    return this.electionService.findAll();
  }

  @Mutation(_returns => Election)
  @UseGuards(GqlAuthGuard)
  public async createElection(
    @Args("name") name: string,
      @Args("description") description: string,
      @CurrentUser() user: User
  ): Promise<Election> {
    const election = new Election();
    election.name = name;
    election.description = description;
    election.slug = slugify(name);
    election.creator = user;
    return this.electionService.save(election);
  }
}
