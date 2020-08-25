import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/strategies/jwt.gql.strategy";
import { Candidate } from "../candidate/candidate.entity";
import { CandidateService } from "../candidate/candidate.service";
import { CurrentUser } from "../user/decorators/currentUser";
import { User } from "../user/user.entity";
import { Election } from "./election.entity";
import { ElectionService } from "./election.service";

@Resolver(Election)
export class ElectionResolver {
  public constructor(
    private readonly electionService: ElectionService,
    private readonly candidateService: CandidateService,
  ) { }

  @Query(_returns => Election, { name: "election" })
  @UseGuards(GqlAuthGuard)
  public async getElection(
    @Args("slug") slug: string
  ): Promise<Election> {
    const election = await this.electionService.findByProp(
      "slug",
      slug,
      ["creator"]
    );
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

  @ResolveField()
  public candidates(@Parent() election: Election): Promise<Candidate[]> {
    return this.candidateService.findAllByProp("electionId", election.id);
  }

  @Mutation(_returns => Election)
  @UseGuards(GqlAuthGuard)
  public async createElection(
    @Args("name") name: string,
      @Args("description") description: string,
      @CurrentUser() user: User
  ): Promise<Election> {
    return this.electionService.create(name, description, user);
  }
}
