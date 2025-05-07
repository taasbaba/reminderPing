import { IsEnum, IsNotEmpty, IsString, IsNumber, IsUrl, IsIn } from 'class-validator';
import { PingType } from '../ping.types';

export class SchedulePingDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsNumber()
    triggerAt: number;

    @IsEnum(PingType)
    type: PingType;
}
