import { Module } from '@nestjs/common';
import { PingService } from './ping.service';
import { ReminderController } from './reminder.controller';
import { PingGateway } from './ping.gateway';

@Module({
  controllers: [ReminderController],
  providers: [PingService, PingGateway],
})
export class PingModule {}
