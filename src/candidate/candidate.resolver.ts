import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/strategies/jwt.gql.strategy";
import { Candidate } from "./candidate.entity";
import { CandidateService } from "./candidate.service";

@Resolver()
export class CandidateResolver {
  public constructor(
    private readonly candidateService: CandidateService
  ) { }

  @Query(_returns => Candidate, { name: "candidate" })
  @UseGuards(GqlAuthGuard)
  public async getCandidate(
    @Args("slug") slug: string
  ): Promise<Candidate> {
    const candidate = await this.candidateService.findByProp(
      "slug",
      slug,
      ["election"]
    );
    if (candidate === undefined) {
      throw new NotFoundException();
    }
    return candidate;
  }

  @Query(_returns => [Candidate], { name: "candidates" })
  @UseGuards(GqlAuthGuard)
  public getCandidatesForElection(
    @Args("election", { type: () => ID }) electionId: string,
  ): Promise<Candidate[]> {
    return this.candidateService.findAllByProp("electionId", electionId);
  }

  @Mutation(_returns => Candidate)
  @UseGuards(GqlAuthGuard)
  public createCandidate(
    @Args("name") name: string,
      @Args("description") description: string,
      @Args("election", { type: () => ID }) electionId: string
  ): Promise<Candidate> {
    return this.candidateService.create(name, description, electionId);
  }

  @Mutation(_returns => Boolean)
  @UseGuards(GqlAuthGuard)
  public async deleteCandidate(
    @Args("id", { type: () => ID }) id: string
  ): Promise<boolean> {
    await this.candidateService.deleteById(id);
    return true;
  }
}
