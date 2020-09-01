import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  public findById(
    id: string,
    relations: string[] = []
  ): Promise<User | undefined> {
    return this.findByProp("id", id, relations);
  }

  public findByProp(
    key: string,
    value: any,
    relations: string[] = []
  ): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { [key]: value },
      relations: relations,
    });
  }

  public findAll(relations: string[] = []): Promise<User[]> {
    return this.userRepository.find({ relations: relations });
  }

  public save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
