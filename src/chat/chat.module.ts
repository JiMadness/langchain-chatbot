import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { LlmService } from './llm.service';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ChatService, LlmService, ChatGateway],
})
export class ChatModule {}
