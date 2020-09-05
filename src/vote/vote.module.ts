import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";
import { ElectionModule } from "../election/election.module";
import { PreferenceModule } from "../preference/preference.module";
import { Vote } from "./vote.entity";
import { VoteResolver } from "./vote.resolver";
import { VoteService } from "./vote.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote]),
    PreferenceModule,
    ElectionModule,
    UserModule,
  ],
  providers: [
    VoteService,
    VoteResolver,
  ],
})
export class VoteModule {}
