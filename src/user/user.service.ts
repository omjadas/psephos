import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindManyOptions, ObjectID } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  public find(options?: FindManyOptions): Promise<User[]> {
    return this.userRepository.find(options);
  }

  public findOne(options: string | number | Date | ObjectID): Promise<User | undefined> {
    return this.userRepository.findOne(options);
  }

  public save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
