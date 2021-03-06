import { ForbiddenException, InternalServerErrorException, NotFoundException, UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/strategies/jwt.gql.strategy";
import { CurrentUser } from "../user/decorators/currentUser";
import { User } from "../user/user.entity";
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
      @Args("election", { type: () => ID }) electionId: string,
      @CurrentUser() user: User
  ): Promise<Candidate> {
    return this.candidateService.create(
      name,
      description,
      electionId,
      user
    );
  }

  @Mutation(_returns => Boolean)
  @UseGuards(GqlAuthGuard)
  public async deleteCandidate(
    @Args("id", { type: () => ID }) id: string,
      @CurrentUser() user: User
  ): Promise<boolean> {
    const candidate = await this.candidateService.findById(id, ["election"]);

    if (candidate?.election.creatorId !== user.id) {
      throw new ForbiddenException();
    }

    await this.candidateService.deleteById(id);
    return true;
  }

  @Mutation(_returns => Candidate)
  @UseGuards(GqlAuthGuard)
  public async updateCandidate(
    @Args("id", { type: () => ID }) id: string,
      @CurrentUser() user: User,
      @Args("name", { nullable: true }) name?: string,
      @Args("description", { nullable: true }) description?: string
  ): Promise<Candidate> {
    const candidate = await this.candidateService.findById(id, ["election"]);

    if (candidate === undefined) {
      throw new NotFoundException();
    }

    if (candidate.election.creatorId !== user.id) {
      throw new ForbiddenException();
    }

    candidate.name = name ?? candidate.name;
    candidate.description = description ?? candidate.description;
    try {
      await this.candidateService.save(candidate);
    } catch (e: unknown) {
      throw new InternalServerErrorException();
    }
    return candidate;
  }
}
