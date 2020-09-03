import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/strategies/jwt.gql.strategy";
import { Preference } from "../preference/preference.entity";
import { PreferenceInput } from "../preference/preference.input";
import { PreferenceService } from "../preference/preference.service";
import { Vote } from "./vote.entity";
import { VoteService } from "./vote.service";

@Resolver(Vote)
export class VoteResolver {
  public constructor(
    private readonly voteService: VoteService,
    private readonly preferenceService: PreferenceService
  ) { }

  @Mutation(_returns => Boolean)
  @UseGuards(GqlAuthGuard)
  public async createVote(
    @Args("electionId", { type: () => ID }) electionId: string,
      @Args("preferences", { type: () => [PreferenceInput] }) preferences: PreferenceInput[]
  ): Promise<boolean> {
    try {
      const vote = new Vote();
      vote.electionId = electionId;
      vote.preferences = [];
      await this.voteService.save(vote);

      await Promise.all(preferences.map(pref => {
        const preference = new Preference();
        preference.candidateId = pref.candidateId;
        preference.preference = pref.preference;
        preference.voteId = vote.id;
        return this.preferenceService.save(preference);
      }));

      return true;
    } catch (e) {
      return false;
    }
  }
}
