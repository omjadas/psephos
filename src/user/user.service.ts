import { Injectable, NotFoundException } from "@nestjs/common";
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
  ): Promise<User> {
    return this.findByProp("id", id, relations);
  }

  public async findByProp(
    key: string,
    value: any,
    relations: string[] = []
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { [key]: value },
      relations: relations,
    });
    if (user === undefined) {
      throw new NotFoundException();
    }
    return user;
  }

  public findAll(relations: string[] = []): Promise<User[]> {
    return this.userRepository.find({ relations: relations });
  }

  public save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
