import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { LlmService } from './llm.service';
import { ChatGateway } from './chat.gateway';
import { ReplService } from './repl.service';
import { RagModule } from '../rag/rag.module';

@Module({
  providers: [ChatService, LlmService, ChatGateway, ReplService],
  imports: [RagModule],
})
export class ChatModule {}
