
import { RegisterDto } from './dtos/RegisterDto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices/exceptions/rpc-exception';
import { LoginDto } from './dtos/LoginDto';
import { JwtService } from '@nestjs/jwt';
import { RpcBadRequestException, RpcNotFoundException } from 'src/common/content/custom-http.exceptions';
import { ErrorMessage } from 'src/common/messages/errors';
@Injectable()
export class AuthService {
      private readonly logger = new Logger(AuthService.name);
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

  async register(registerDto: RegisterDto) {
    try {
      const existingUser = await this.userRepository.findOneBy({
        mobile: registerDto.mobile,
      });

      if (existingUser) {
        throw new RpcBadRequestException(ErrorMessage.USER.EXIST_USER);
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      const user = this.userRepository.create({
        mobile: registerDto.mobile,
        name: registerDto.name,
        password: hashedPassword,
      });

      const savedUser = await this.userRepository.save(user);

      return {
        id: savedUser.id,
        mobile: savedUser.mobile,
        name: savedUser.name,
      };
    } catch (error) {
      this.logger.error('Registration failed', error);
      throw new RpcException('Registration failed');
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({
      mobile: loginDto.mobile,
    });

    if (!user) {
      throw new RpcNotFoundException(ErrorMessage.USER.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
        throw new RpcBadRequestException(ErrorMessage.USER.PASSWORD_VALID);
    }

    const payload = {
      sub: user.id,
      mobile: user.mobile,
      name: user.name,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
