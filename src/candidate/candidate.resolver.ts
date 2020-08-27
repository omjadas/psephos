import { UseGuards } from "@nestjs/common";
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
  public getCandidate(
    @Args("slug") slug: string
  ): Promise<Candidate> {
    return this.candidateService.findByProp(
      "slug",
      slug,
      ["election"]
    );
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

  @Mutation(_returns => Candidate)
  @UseGuards(GqlAuthGuard)
  public async updateCandidate(
    @Args("id") id: string,
      @Args("name") name?: string,
      @Args("description") description?: string
  ): Promise<Candidate> {
    const candidate = await this.candidateService.findById(id);
    candidate.name = name ?? candidate.name;
    candidate.description = description ?? candidate.description;
    this.candidateService.save(candidate);
    return candidate;
  }
}
