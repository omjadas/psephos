import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import crypto from "crypto";
import slugify from "slugify";
import { DeleteResult, QueryFailedError, Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Election } from "./election.entity";

@Injectable()
export class ElectionService {
  public constructor(
    @InjectRepository(Election) private readonly electionRepository: Repository<Election>
  ) { }

  public findById(
    id: string,
    relations: string[] = []
  ): Promise<Election> {
    return this.findByProp("id", id, relations);
  }

  public async findByProp(
    key: string,
    value: any,
    relations: string[] = []
  ): Promise<Election> {
    const election = await this.electionRepository.findOne({
      where: { [key]: value },
      relations: relations,
    });

    if (election === undefined) {
      throw new NotFoundException();
    }

    return election;
  }

  public findAll(relations: string[] = []): Promise<Election[]> {
    return this.electionRepository.find({ relations: relations });
  }

  public findAllByProp(
    key: string,
    value: any,
    relations: string[] = []
  ): Promise<Election[]> {
    return this.electionRepository.find({
      where: { [key]: value },
      relations: relations,
    });
  }

  public deleteById(id: string): Promise<DeleteResult> {
    return this.electionRepository.delete(id);
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
