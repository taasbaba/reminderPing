import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PingModule,
  ],
})
export class AppModule { }
