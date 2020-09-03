import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PreferenceModule } from "../preference/preference.module";
import { Vote } from "./vote.entity";
import { VoteResolver } from "./vote.resolver";
import { VoteService } from "./vote.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote]),
    PreferenceModule,
  ],
  providers: [
    VoteService,
    VoteResolver,
  ],
})
export class VoteModule {}
