import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, ID, Query, Resolver } from "@nestjs/graphql";
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
}
