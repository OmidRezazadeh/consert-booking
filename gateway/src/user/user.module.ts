import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MicroserviceClientService } from 'src/common/microserviceClient.service';
import { MicroservicesModule } from 'src/shared/microservices.module';

@Module({
  imports: [MicroservicesModule],
  providers: [UserService,MicroserviceClientService],
  controllers: [UserController]
})
export class UserModule {}
