import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { LlmService } from './llm.service';
import { ChatGateway } from './chat.gateway';
import { ReplService } from './repl.service';

@Module({
  providers: [ChatService, LlmService, ChatGateway, ReplService],
})
export class ChatModule {}
