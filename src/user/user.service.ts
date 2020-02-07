import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  public findById(id: string): Promise<User | undefined> {
    return this.findByProp("uuid", id);
  }

  public findByProp(key: string, value: any): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { [key]: value } });
  }

  public findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
