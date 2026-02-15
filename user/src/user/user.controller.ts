import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {} 

    @Get("test")
  async  getUser() {
        const user={userId:1,email:"test@example.com"};
        return await this.userService.createUser(user);
    }
}
