import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MicroserviceClientService } from 'src/common/microserviceClient.service';
import { MicroservicesModule } from 'src/shared/microservices.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guards/JwtStrategy';

@Module({
  imports: [
    MicroservicesModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET!, // Replace with your secret key
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService, MicroserviceClientService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
