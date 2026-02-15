import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';


export const USER_SERVICE_TOKEN = 'USER_SERVICE';
export const DEFAULT_USER_QUEUE = 'user_queue';

export const PROFILE_SERVICE_TOKEN = 'PROFILE_SERVICE';
export const DEFAULT_PROFILE_QUEUE = 'profile_queue';

export const WALLET_SERVICE_TOKEN = 'WALLET_SERVICE';
export const DEFAULT_WALLET_QUEUE = 'wallet_queue';

const DEFAULT_RMQ_URL: string = 'amqp://localhost';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ClientsModule.registerAsync([
      {
        name: USER_SERVICE_TOKEN,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RMQ_URL') || DEFAULT_RMQ_URL],
            queue: configService.get<string>('USER_QUEUE') || DEFAULT_USER_QUEUE,
            queueOptions: { durable: true },
            noAck: true,
          },
        }),
        inject: [ConfigService],

      },
      {
        name: PROFILE_SERVICE_TOKEN,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RMQ_URL') || DEFAULT_RMQ_URL],
            queue:
              configService.get<string>('PROFILE_QUEUE') ||
              DEFAULT_PROFILE_QUEUE,
            queueOptions: { durable: true },
            noAck: true,
          },
        }),
        inject: [ConfigService],
      },
      {
        name: WALLET_SERVICE_TOKEN,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RMQ_URL') || DEFAULT_RMQ_URL],
            queue:
              configService.get<string>('WALLET_QUEUE') ||
              DEFAULT_WALLET_QUEUE,
            queueOptions: { durable: true },
            noAck: true,
          },
        }),
        inject: [ConfigService],
      }

    ]),
  ],

  exports: [ClientsModule], 
})
export class MicroservicesModule {}