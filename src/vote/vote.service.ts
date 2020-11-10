import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Vote } from "./vote.entity";

@Injectable()
export class VoteService {
  public constructor(
    @InjectRepository(Vote) private readonly voteRepository: Repository<Vote>
  ) { }

  public findById(
    id: string,
    relations: string[] = []
  ): Promise<Vote | undefined> {
    return this.findByProp("id", id, relations);
  }

  public findByProp(
    key: string,
    value: unknown,
    relations: string[] = []
  ): Promise<Vote | undefined> {
    return this.voteRepository.findOne({
      where: { [key]: value },
      relations: relations,
    });
  }

  public findAll(relations: string[] = []): Promise<Vote[]> {
    return this.voteRepository.find({ relations: relations });
  }

  public findAllByProp(
    key: string,
    value: unknown,
    relations: string[] = []
  ): Promise<Vote[]> {
    return this.voteRepository.find({
      where: { [key]: value },
      relations: relations,
    });
  }

  public deleteById(id: string): Promise<DeleteResult> {
    return this.voteRepository.delete(id);
  }

  public save(vote: Vote): Promise<Vote> {
    return this.voteRepository.save(vote);
  }
}
