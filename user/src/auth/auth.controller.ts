import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from './dtos/RegisterDto';

@Controller('auth')
export class AuthController {

    @MessagePattern('register')
    register(@Payload() registerDto: RegisterDto) {
    
            // mobile: registerDto.mobile,
            // name: registerDto.name,
            // password: registerDto.password

    }
}
