
import { MicroserviceClientService } from 'src/common/microserviceClient.service';
import { ServiceNames, UserTopics } from 'src/shared/constants';
import { RegisterDto } from './dtos/RegisterDto';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('user')
export class UserController {

    constructor(
        @Inject(ServiceNames.USER_SERVICE) private readonly userClient: ClientKafka,
        private readonly microserviceClient: MicroserviceClientService,
    ) { }
    async onModuleInit() {
        this.userClient.subscribeToResponseOf(UserTopics.REGISTER);
        await this.userClient.connect();
    }

    @Post('register')
    async register(
        @Body() registerDto: RegisterDto) {
        return this.microserviceClient.call(
            this.userClient,
            UserTopics.REGISTER,
            registerDto,
        );
    }

}
