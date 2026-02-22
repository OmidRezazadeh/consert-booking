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
        const existingUser = await this.authService.findUserByMobile(registerDto.mobile);

        if (existingUser) {
            throw new RpcException({
                status: 'error',
                message: 'User with this mobile already exists',
            });
        }
        return this.authService.store(registerDto);

    }
    @MessagePattern('login')
    async login(@Payload() loginDto: LoginDto) {
        await this.authService.validateLogin(loginDto);
        return this.authService.makeToken(loginDto);


    }
}
