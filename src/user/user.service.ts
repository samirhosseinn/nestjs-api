import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO, RegisterDTO } from './dto';
import { dlopen } from 'process';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.user.find();
  }

  async register(register: RegisterDTO): Promise<number> {
    const user = this.user.create({
      name: register.name,
      email: register.email,
      password: register.password,
    });
    await this.user.save(user);
    return user.id;
  }

  async login(login: LoginDTO): Promise<boolean> {
    const user = await this.user.findOne({ where: { email: login.email, password: login.password } })

    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
