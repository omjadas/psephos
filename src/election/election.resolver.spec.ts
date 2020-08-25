import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Candidate } from "../candidate/candidate.entity";
import { CandidateService } from "../candidate/candidate.service";
import { Election } from "./election.entity";
import { ElectionResolver } from "./election.resolver";
import { ElectionService } from "./election.service";

describe("ElectionResolver", () => {
  let resolver: ElectionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElectionResolver,
        ElectionService,
        CandidateService,
        {
          provide: getRepositoryToken(Election),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Candidate),
          useClass: Repository,
        },
      ],
    }).compile();

    resolver = module.get<ElectionResolver>(ElectionResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
