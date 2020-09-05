import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Election as ElectionCounter, stv } from "caritat";
import crypto from "crypto";
import slugify from "slugify";
import { DeleteResult, LessThan, QueryFailedError, Repository } from "typeorm";
import { CandidateService } from "../candidate/candidate.service";
import { User } from "../user/user.entity";
import { Election } from "./election.entity";

@Injectable()
export class ElectionService {
  public constructor(
    @InjectRepository(Election) private readonly electionRepository: Repository<Election>,
    private readonly candidateService: CandidateService
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

  public findVisible(user: User, relations: string[] = []): Promise<Election[]> {
    return this.electionRepository.find({
      where: [
        { creatorId: user.id },
        { startTime: LessThan(new Date().toISOString()) },
      ],
      relations: relations,
    });
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

  public async countVotes(election: Election): Promise<void> {
    const myElection = new ElectionCounter({
      candidates: election.candidates.map(c => c.id),
    });

    election.votes.forEach(vote => {
      const prefs: string[] = [];

      vote.preferences.forEach(pref => {
        prefs[pref.preference - 1] = pref.candidateId;
      });

      myElection.addBallot(prefs);
    });

    const winners = stv.meek(myElection, { seats: election.seats });

    const candidatePromises = [];

    for (const candidate of election.candidates) {
      candidate.elected = winners.includes(candidate.id);
      candidatePromises.push(this.candidateService.save(candidate));
    }

    await Promise.all(candidatePromises);
  }

  public async create(
    name: string,
    seats: number,
    startTime: Date,
    finishTime: Date | null,
    description: string,
    creator: User
  ): Promise<Election> {
    let attempts = 10;

    while (attempts > 0) {
      try {
        const election = new Election();
        election.name = name;
        election.seats = seats;
        election.startTime = startTime;
        election.finishTime = finishTime;
        election.description = description;
        election.slug = `${slugify(name)}-${crypto.randomBytes(8).toString("hex")}`;
        election.creator = creator;
        return await this.save(election);
      } catch (e: unknown) {
        attempts--;
        if (!(e instanceof QueryFailedError)) {
          throw e;
        }
      }
    }

    throw new Error();
  }
}
