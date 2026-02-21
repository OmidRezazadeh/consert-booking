import { Module } from '@nestjs/common';
import { MicroservicesModule } from './shared/microservices.module';
import { ConfigModule } from '@nestjs/config';
import { MicroserviceClientModule } from './common/microserviceClient.module';
import { UserModule } from './user/user.module';
@Module({
  
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
    }),
    MicroserviceClientModule,
    MicroservicesModule,
    UserModule
  ],
})
export class AppModule {}