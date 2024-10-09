import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto';
import { ResutlForm } from 'src/constatnts/result_form';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    const result = await this.userService.findAll();

    return result;
  }

  @Post('signup')
  async register(@Body() dto: UserDTO) {
    const id = await this.userService.register(dto);
    const result = new ResutlForm(true, { created_user_id: id });

    return result.toMap();
  }
}
