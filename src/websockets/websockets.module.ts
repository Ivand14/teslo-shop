import { Module } from '@nestjs/common';
import { WebSockets } from './websockets.gateway';
import { WebsocketsService } from './websockets.service';

@Module({
  providers: [WebSockets, WebsocketsService],
})
export class WebsocketsModule {}
