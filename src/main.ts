import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ReplService } from './chat/repl.service';
import { Logger } from '@nestjs/common';
import { RagService } from './rag/rag.service';
import * as process from 'node:process';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const mainLogger = new Logger('Main');
  const ragService = app.get(RagService);

  mainLogger.log('Embedding website', process.env.PRODUCT_URL);

  await ragService.ingestWebsite(process.env.PRODUCT_URL as string);

  mainLogger.log('Embedding done');

  if (process.env.PROTOCOL === 'REPL') {
    const replService = app.get(ReplService);
    mainLogger.log('Chatbot CLI is ready. Start chatting below:');
    replService.ask();
  } else {
    app.useWebSocketAdapter(new IoAdapter(app));
    await app.listen(process.env.PORT || 3000);
    mainLogger.log(`Chatbot is running on ${await app.getUrl()}`);
  }
}
bootstrap();
