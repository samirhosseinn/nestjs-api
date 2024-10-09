import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.user.find();
  }

  async register(userr: UserDTO): Promise<number> {
    const user = this.user.create({
      name: userr.name,
      email: userr.email,
      password: userr.password,
    });
    await this.user.save(user);
    return user.id;
  }
}
