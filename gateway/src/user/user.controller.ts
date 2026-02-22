import { MicroserviceClientService } from 'src/common/microserviceClient.service';
import { ServiceNames, UserTopics } from 'src/shared/constants';
import { RegisterDto } from './dtos/RegisterDto';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { LoginDto } from './dtos/LoginDto';


@Controller('user')
export class UserController {

    constructor(
        @Inject(ServiceNames.USER_SERVICE) private readonly userClient: ClientKafka,
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
       try {
            // Log the payload for debugging
            console.log('Sending payload to Kafka:', registerDto);

            return this.microserviceClient.call(
                this.userClient,
                UserTopics.REGISTER,
                registerDto,
            );
       } catch (error) {
            // Log the error for better debugging
            console.error('Error during Kafka call:', error);
            throw error;
       }
    }
    @Post('login')
    async login(
        @Body() loginDto: LoginDto) {
       try {
            // Log the payload for debugging
            console.log('Sending payload to Kafka:', loginDto); 
            return this.microserviceClient.call(
                this.userClient,
                UserTopics.LOGIN,
                loginDto,
            );
       } catch (error) {
            // Log the error for better debugging
            console.error('Error during Kafka call:', error);
            throw error;
       }    
}
}