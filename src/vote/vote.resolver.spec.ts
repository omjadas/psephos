import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Preference } from "../preference/preference.entity";
import { PreferenceService } from "../preference/preference.service";
import { Vote } from "./vote.entity";
import { VoteResolver } from "./vote.resolver";
import { VoteService } from "./vote.service";

describe("VoteResolver", () => {
  let resolver: VoteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteResolver,
        VoteService,
        PreferenceService,
        {
          provide: getRepositoryToken(Vote),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Preference),
          useClass: Repository,
        },
      ],
    }).compile();

    resolver = module.get<VoteResolver>(VoteResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
