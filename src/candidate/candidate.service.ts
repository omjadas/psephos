import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import crypto from "crypto";
import slugify from "slugify";
import { DeleteResult, QueryFailedError, Repository } from "typeorm";
import { Candidate } from "./candidate.entity";

@Injectable()
export class CandidateService {
  public constructor(
    @InjectRepository(Candidate) private readonly candidateRepository: Repository<Candidate>
  ) { }

  public findById(
    id: string,
    relations: string[] = []
  ): Promise<Candidate> {
    return this.findByProp("id", id, relations);
  }

  public async findByProp(
    key: string,
    value: any,
    relations: string[] = []
  ): Promise<Candidate> {
    const candidate = await this.candidateRepository.findOne({
      where: { [key]: value },
      relations: relations,
    });
    if (candidate === undefined) {
      throw new NotFoundException();
    }
    return candidate;
  }

  public findAll(relations: string[] = []): Promise<Candidate[]> {
    return this.candidateRepository.find({ relations: relations });
  }

  public findAllByProp(
    key: string,
    value: any,
    relations: string[] = []
  ): Promise<Candidate[]> {
    return this.candidateRepository.find({
      where: { [key]: value },
      relations: relations,
    });
  }

  public deleteById(id: string): Promise<DeleteResult> {
    return this.candidateRepository.delete(id);
  }

  public save(candidate: Candidate): Promise<Candidate> {
    return this.candidateRepository.save(candidate);
  }

  public async create(
    name: string,
    description: string,
    electionId: string
  ): Promise<Candidate> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const candidate = new Candidate();
        candidate.name = name;
        candidate.description = description;
        candidate.electionId = electionId;
        candidate.slug = `${slugify(name)}-${crypto.randomBytes(8).toString("hex")}`;
        return await this.save(candidate);
      } catch (e: unknown) {
        if (!(e instanceof QueryFailedError)) {
          throw e;
        }
      }
    }
  }
}
