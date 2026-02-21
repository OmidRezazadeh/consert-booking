import { Global, Module } from '@nestjs/common';
import { MicroserviceClientService } from './microserviceClient.service';


@Global()
@Module({
  providers: [MicroserviceClientService],
  exports: [MicroserviceClientService],
})
export class MicroserviceClientModule {}
