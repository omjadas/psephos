import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Preference } from "./preference.entity";
import { PreferenceService } from "./preference.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Preference]),
  ],
  providers: [
    PreferenceService,
  ],
  exports: [
    PreferenceService,
  ],
})
export class PreferenceModule {}
