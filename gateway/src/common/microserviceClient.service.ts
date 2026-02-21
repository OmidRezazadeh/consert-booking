import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { RequestTimeoutException } from '@nestjs/common/exceptions/request-timeout.exception';
import { ClientKafka } from '@nestjs/microservices/client/client-kafka';
import { firstValueFrom, timeout, TimeoutError } from 'rxjs';

@Injectable()
export class MicroserviceClientService {

    async call<T>(
        client: ClientKafka,
        pattern: string,
        data: any,
    ): Promise<T> {

        try {
            return await firstValueFrom(
                client.send(pattern, data).pipe(
                    timeout(5000),
                ),
            );
        } catch (error) {
            if (error instanceof TimeoutError) {
                throw new RequestTimeoutException(`Timeout on ${pattern}`);
            }
            console.error(`[Kafka Error] Pattern: ${pattern}`, error);

            throw error;
        }
    }
}
