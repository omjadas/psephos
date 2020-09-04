import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Election as ElectionCounter, stv } from "caritat";
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

  public countVotes(election: Election): void {
    const myElection = new ElectionCounter({
      candidates: election.candidates.map(c => c.id),
    });

    election.votes.forEach(vote => {
      const prefs: string[] = [];

      vote.preferences.forEach(pref => {
        prefs[pref.preference] = pref.candidateId;
      });

      myElection.addBallot(prefs);
    });

    const winners = stv.meek(myElection);

    election.candidates.forEach(candidate => {
      if (winners.includes(candidate.id)) {
        candidate.elected = true;
      }
    });
  }

  public async create(
    name: string,
    seats: number,
    description: string,
    creator: User
  ): Promise<Election> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const election = new Election();
        election.name = name;
        election.seats = seats;
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
