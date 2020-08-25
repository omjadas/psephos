import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import crypto from "crypto";
import slugify from "slugify";
import { User } from "src/user/user.entity";
import { QueryFailedError, Repository } from "typeorm";
import { Election } from "./election.entity";

@Injectable()
export class ElectionService {
  public constructor(
    @InjectRepository(Election) private readonly electionRepository: Repository<Election>
  ) { }

  public findById(
    id: string,
    relations: string[] = []
  ): Promise<Election | undefined> {
    return this.findByProp("id", id, relations);
  }

  public findByProp(
    key: string,
    value: any,
    relations: string[] = []
  ): Promise<Election | undefined> {
    return this.electionRepository.findOne({
      where: { [key]: value },
      relations: relations,
    });
  }

  public findAll(): Promise<Election[]> {
    return this.electionRepository.find();
  }

  public findAllByProp(key: string, value: any): Promise<Election []> {
    return this.electionRepository.find({
      where: { [key]: value },
    });
  }

  public save(election: Election): Promise<Election> {
    return this.electionRepository.save(election);
  }

  public async create(
    name: string,
    description: string,
    creator: User
  ): Promise<Election> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const election = new Election();
        election.name = name;
        election.description = description;
        election.slug = `${slugify(name)}-${crypto.randomBytes(8).toString("hex")}`;
        election.creator = creator;
        return await this.save(election);
      } catch (e: unknown) {
        if (!(e instanceof QueryFailedError)) {
          throw e;
        }
      }
    }
  }
}
