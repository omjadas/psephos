import { Test, TestingModule } from "@nestjs/testing";
import { CandidateResolver } from "./candidate.resolver";

describe("CandidateResolver", () => {
  let resolver: CandidateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandidateResolver],
    }).compile();

    resolver = module.get<CandidateResolver>(CandidateResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
