import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Election } from "../election/election.entity";
import { ElectionService } from "../election/election.service";
import { Candidate } from "./candidate.entity";
import { CandidateResolver } from "./candidate.resolver";
import { CandidateService } from "./candidate.service";

describe("CandidateResolver", () => {
  let resolver: CandidateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidateResolver,
        CandidateService,
        ElectionService,
        {
          provide: getRepositoryToken(Candidate),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Election),
          useClass: Repository,
        },
      ],
    }).compile();

    resolver = module.get<CandidateResolver>(CandidateResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
