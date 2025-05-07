import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PingService } from './ping.service';
import { ReminderPayload, PingType } from './ping.types';
import { v4 as uuidv4 } from 'uuid';
import { SchedulePingDto } from './dto/schedule-ping.dto';

@Controller('reminders')
export class ReminderController {
    constructor(private readonly pingService: PingService) { }

    @Post()
    async scheduleReminder(@Body() dto: SchedulePingDto): Promise<{ message: string; id: string }> {
        const id = uuidv4();

        const payload: ReminderPayload = {
            id,
            userId: dto.userId,
            message: dto.message,
            triggerAt: dto.triggerAt,
            type: dto.type,
        };

        await this.pingService.schedulePing(payload);
        return { message: 'Reminder scheduled successfully', id };
    }

    @Delete(':id')
    async cancelReminder(@Param('id') id: string): Promise<{ message: string }> {
        await this.pingService.cancelPing(id);
        return { message: `Reminder [${id}] canceled` };
    }

    @Get('health')
    healthCheck(): string {
        return 'ReminderPing API is running.';
    }
}
