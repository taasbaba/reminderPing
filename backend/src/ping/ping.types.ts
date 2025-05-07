export enum PingType {
    WEBSOCKET = 'websocket',
    WEBHOOK = 'webhook',
    LOG = 'log',
}

export interface ReminderPayload {
    id: string;
    userId: string;
    message: string;
    triggerAt: number; // Unix timestamp (ms)
    type: PingType;
}
