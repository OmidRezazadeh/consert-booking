import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { RegisterDto } from './dtos/RegisterDto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/LoginDto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }
   @MessagePattern('register')
  async register(@Payload() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @MessagePattern('login')
  async login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
