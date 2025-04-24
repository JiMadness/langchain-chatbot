import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  private readonly logger = new Logger(ChatGateway.name);

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody()
    data: {
      message: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.debug(`Received message from ${client.id}: ${data.message}`);

    const stream = this.chatService.streamReply(data.message, client.id);

    for await (const chunk of stream) {
      this.logger.debug(
        `Received response for ${client.id}: ${JSON.stringify(chunk)}`,
      );

      client.emit('response', chunk);
    }
  }
}
