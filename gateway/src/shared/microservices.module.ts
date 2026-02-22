
import { Module } from '@nestjs/common';
import { ServiceNames } from './constants';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Partitioners } from 'kafkajs';
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ServiceNames.USER_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>('GATEWAY_CLIENT_ID')!,

              brokers: [
                configService.get<string>('KAFKA_BROKER')!,
              ],
            },
            consumer: {
              groupId: configService.get<string>('GATEWAY_GROUP_ID')!,
            },
            producer: {
              createPartitioner: Partitioners.LegacyPartitioner,
            },
          },
        }),
      },

    ]),
  ],
  exports: [ClientsModule],
})
export class MicroservicesModule { }
