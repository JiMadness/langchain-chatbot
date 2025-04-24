import { Injectable } from '@nestjs/common';
import * as readline from 'node:readline';
import { ChatService } from './chat.service';

@Injectable()
export class ReplService {
  private readonly reader: readline.Interface;
  constructor(private readonly chatService: ChatService) {
    this.reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  private simulateTyping() {
    const frames = ['', '.', '..', '...'];
    return setInterval(() => {
      const frame = frames[Math.floor(Date.now() / 500) % frames.length];
      process.stdout.write(`\r\x1b[32m🤖 Typing${frame}   \x1b[0m`);
    }, 100);
  }

  ask(threadId?: string) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.reader.question('\x1b[34mYou: ', async (message: string) => {
      try {
        this.reader.write('\x1b[0m');
        const typingInterval = this.simulateTyping();
        const response = await this.chatService.getReply(message, threadId);
        clearInterval(typingInterval);
        process.stdout.write(`\r          \r`);

        threadId = response.threadId;
        this.reader.write(`\x1b[35mBot: ${response.reply}\n\x1b[0m`);
      } catch {
        this.reader.write(
          `\x1b[35mBot: I am currently facing technical issues at the moment. Please try again later.\n\x1b[0m`,
        );
      }

      this.ask(threadId);
    });
  }
}
