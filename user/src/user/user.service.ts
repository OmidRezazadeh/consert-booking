import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientProxy,
  ) {}

  async createUser(user:any) {

     this.kafkaClient.emit('users', {
      event: 'user.created',
      data: user,
    });
  }
}
