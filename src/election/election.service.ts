import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Election } from "./election.entity";

@Injectable()
export class ElectionService {
  public constructor(
    @InjectRepository(Election) private readonly electionRepository: Repository<Election>
  ) { }

  public findById(id: string): Promise<Election | undefined> {
    return this.findByProp("id", id);
  }

  public findByProp(key: string, value: any): Promise<Election | undefined> {
    return this.electionRepository.findOne({ where: { [key]: value } });
  }

  public findAll(): Promise<Election[]> {
    return this.electionRepository.find();
  }

  public save(election: Election): Promise<Election> {
    return this.electionRepository.save(election);
  }
}
