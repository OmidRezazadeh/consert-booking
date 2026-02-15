import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { ConcertModule } from './concert/concert.module';

@Module({
  imports: [UserModule, BookingModule, ConcertModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
