import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService : UserService) {}

    @Get()
    async findAll() {
        const result = await this.userService.findAll();

        return result;
    } 
}
