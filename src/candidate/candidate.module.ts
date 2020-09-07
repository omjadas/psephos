import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ElectionModule } from "../election/election.module";
import { Candidate } from "./candidate.entity";
import { CandidateResolver } from "./candidate.resolver";
import { CandidateService } from "./candidate.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate]),
    forwardRef(() => ElectionModule),
  ],
  providers: [
    CandidateService,
    CandidateResolver,
  ],
  exports: [
    CandidateService,
  ],
})
export class CandidateModule { }
