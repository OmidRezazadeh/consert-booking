import { MicroserviceClientService } from 'src/common/microserviceClient.service';
import { ServiceNames, UserTopics } from 'src/shared/constants';
import { RegisterDto } from './dtos/RegisterDto';
import { Body, Controller, Get, Inject, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { LoginDto } from './dtos/LoginDto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';


@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(
        @Inject(ServiceNames.USER_SERVICE)
        private readonly userClient: ClientKafka,
        private readonly microserviceClient: MicroserviceClientService,
    ) { }
    async onModuleInit() {
        this.userClient.subscribeToResponseOf(UserTopics.REGISTER);
        this.userClient.subscribeToResponseOf(UserTopics.LOGIN); // Subscribe to the login topic
        await this.userClient.connect();
    }

    @Post('register')
    async register(
        @Body() registerDto: RegisterDto) {


        this.logger.log('Sending payload to Kafka:', registerDto);

        return this.microserviceClient.call(
            this.userClient,
            UserTopics.REGISTER,
            registerDto,
        );

    }
    @Post('login')
    async login(
        @Body() loginDto: LoginDto) {

        // Log the payload for debugging
        this.logger.log('Sending payload to Kafka:', loginDto);
        return this.microserviceClient.call(
            this.userClient,
            UserTopics.LOGIN,
            loginDto,
        );
    }
    @Get('me')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
    const userId = req.user.userId;
    const mobile = req.user.mobile;

    }
}