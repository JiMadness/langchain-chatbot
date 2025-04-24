import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ChatService } from './chat/chat.service';
import * as readline from 'node:readline';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.PROTOCOL === 'REPL') {
    const chatService = app.get(ChatService);
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let threadId: string | undefined;

    const ask = () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      reader.question('\x1b[34mYou: ', async (message: string) => {
        const response = await chatService.getReply(message, threadId);
        threadId = response.threadId;
        reader.write(`\x1b[35mBot: ${response.reply}\n`);

        ask();
      });
    };

    console.log('Chatbot CLI is ready. Start chatting below:');
    ask();
  } else {
    app.useWebSocketAdapter(new IoAdapter(app));
    await app.listen(process.env.PORT || 3000);
    console.log('Chatbot is running on http://localhost:3000');
  }
}
bootstrap();
