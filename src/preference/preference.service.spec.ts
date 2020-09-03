import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Preference } from "./preference.entity";
import { PreferenceService } from "./preference.service";

describe("PreferenceService", () => {
  let service: PreferenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PreferenceService,
        {
          provide: getRepositoryToken(Preference),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PreferenceService>(PreferenceService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
