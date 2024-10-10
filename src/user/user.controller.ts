import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { chNameDTO, LoginDTO, RegisterDTO } from './dto';
import { ResutlForm } from 'src/constatnts/result_form';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  async findAll() {
    const result = await this.userService.findAll();

    return result;
  }

  @Post('register')
  async register(@Body() dto: RegisterDTO) {
    const id = await this.userService.register(dto);
    const result = new ResutlForm(true, { created_user_id: id });

    return result.toMap();
  }

  @Post('login')
  async login(@Body() dto: LoginDTO) {
    const login = await this.userService.login(dto);
    let result = new ResutlForm(login, {});
    if (login) {
      result.body = { message: "login successfull" };
    } else {
      result.body = { message: "credential error" };
    }

    return result.toMap();
  }

  @Post('change/name')
  async changeName(@Body() dto: chNameDTO) {
    await this.userService.changeName(dto);
    
    const result = new ResutlForm(true, { message : "Name changed"});
    return result.toMap();
  }
}
