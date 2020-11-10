import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Preference } from "./preference.entity";

@Injectable()
export class PreferenceService {
  public constructor(
    @InjectRepository(Preference) private readonly preferenceRepository: Repository<Preference>
  ) { }

  public findById(
    id: string,
    relations: string[] = []
  ): Promise<Preference | undefined> {
    return this.findByProp("id", id, relations);
  }

  public findByProp(
    key: string,
    value: unknown,
    relations: string[] = []
  ): Promise<Preference | undefined> {
    return this.preferenceRepository.findOne({
      where: { [key]: value },
      relations: relations,
    });
  }

  public findAll(relations: string[] = []): Promise<Preference[]> {
    return this.preferenceRepository.find({ relations: relations });
  }

  public findAllByProp(
    key: string,
    value: unknown,
    relations: string[] = []
  ): Promise<Preference[]> {
    return this.preferenceRepository.find({
      where: { [key]: value },
      relations: relations,
    });
  }

  public deleteById(id: string): Promise<DeleteResult> {
    return this.preferenceRepository.delete(id);
  }

  public save(preference: Preference): Promise<Preference> {
    return this.preferenceRepository.save(preference);
  }
}
