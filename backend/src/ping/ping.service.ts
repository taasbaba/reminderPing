import { Injectable, Logger } from '@nestjs/common';
import { ReminderPayload, PingType } from './ping.types';
import { PingGateway } from './ping.gateway';

@Injectable()
export class PingService {
    private readonly logger = new Logger(PingService.name);

    constructor(private readonly gateway: PingGateway) { }

    /**
     * Schedule a ping job to be executed at the given time.
     */
    async schedulePing(payload: ReminderPayload): Promise<void> {
        const delay = payload.triggerAt - Date.now();

        if (delay <= 0) {
            this.logger.warn(`Trigger time is in the past. Sending immediately.`);
            return this.dispatchPing(payload);
        }

        setTimeout(() => {
            this.dispatchPing(payload);
        }, delay);

        this.logger.log(`Scheduled ping [${payload.id}] in ${delay}ms`);
    }

    /**
     * Cancel a scheduled ping job by its ID.
     * (Currently not supported without Bull or a custom queue manager.)
     */
    async cancelPing(id: string): Promise<void> {
        this.logger.warn(`Canceling ping [${id}] is not supported in setTimeout mode.`);
        // Optionally implement this later using a map of timers.
    }

    /**
     * Dispatch the ping immediately.
     */
    async dispatchPing(payload: ReminderPayload): Promise<void> {
        switch (payload.type) {
            case PingType.WEBSOCKET:
                return this.sendWebSocket(payload);
            case PingType.LOG:
            default:
                return this.logPing(payload);
        }
    }

    private async sendWebSocket(payload: ReminderPayload) {
        this.gateway.sendToUser(payload.userId, {
            message: payload.message,
            triggerAt: payload.triggerAt,
        });
        this.logger.log(`Ping via WebSocket to user ${payload.userId}`);
    }

    private async logPing(payload: ReminderPayload): Promise<void> {
        this.logger.log(`(LOG) Ping for user [${payload.userId}]: "${payload.message}"`);
    }
}
