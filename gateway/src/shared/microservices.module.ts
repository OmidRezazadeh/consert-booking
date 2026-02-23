
import { Module } from '@nestjs/common';
import { ServiceNames } from './constants';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Partitioners } from 'kafkajs';
@Module({
  imports: [
    // ClientsModule.registerAsync([
    //   {
    //     name: ServiceNames.USER_SERVICE,
    //     inject: [ConfigService],
    //     useFactory: (configService: ConfigService) => ({
    //       transport: Transport.KAFKA,
    //       options: {
    //         client: {
    //           clientId: configService.get<string>('GATEWAY_CLIENT_ID')!,

    //           brokers: [
    //             configService.get<string>('KAFKA_BROKER')!,
    //           ],
    //         },
    //         consumer: {
    //           groupId: configService.get<string>('GATEWAY_GROUP_ID')!,
    //         },
    //         producer: {
    //           createPartitioner: Partitioners.LegacyPartitioner,
    //         },
    //       },
    //     }),
    //   },

    // ]),
  ClientsModule.registerAsync([
      {
        name: ServiceNames.USER_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const brokers = configService.get<string>('KAFKA_BROKER');
          const clientId = configService.get<string>('GATEWAY_CLIENT_ID');
          const groupId = configService.get<string>('GATEWAY_GROUP_ID');

          if (!brokers || !clientId || !groupId) {
            throw new Error('Kafka configuration is missing');
          }

          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId,
                brokers: brokers.split(','), // supports multi broker
              },
              consumer: {
                groupId,
              },
              producer: {
                createPartitioner: Partitioners.LegacyPartitioner,
              },
            },
          };
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class MicroservicesModule { }
