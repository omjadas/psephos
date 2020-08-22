import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Election } from "./election.entity";
import { Repository } from "typeorm";

@Injectable()
export class ElectionService {
  public constructor(
    @InjectRepository(Election) private readonly electionRepository: Repository<Election>
  ) { }
}
