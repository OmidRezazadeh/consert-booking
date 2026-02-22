
import { RegisterDto } from './dtos/RegisterDto';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices/exceptions/rpc-exception';
import { LoginDto } from './dtos/LoginDto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }
    async findUserByMobile(mobile: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ mobile });
    }


    async store(registerDto: RegisterDto): Promise<User> {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(registerDto.password, salt);
            registerDto.password = hashedPassword;
            const user = this.userRepository.create({
                ...registerDto
            });


            return await this.userRepository.save(user);
        } catch (error) {
            console.error('Error saving user to database:', error);
            throw new InternalServerErrorException('Error saving user to database');
        }
    }
    async validateLogin(loginDto: LoginDto) {
        const user = await this.findUserByMobile(loginDto.mobile);
        if (!user) {
            throw new RpcException({
                status: 'error',
                message: 'User not found',
            });
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new RpcException({
                status: 'error',
                message: 'Invalid password',
            });
        }

    }
   async makeToken(loginDto: LoginDto) {
    const user = await this.findUserByMobile(loginDto.mobile);
      if (!user) {
            throw new RpcException({
                status: 'error',
                message: 'User not found',
            });
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
