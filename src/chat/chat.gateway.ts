import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody()
    data: {
      message: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Received message from ${client.id}: ${data.message}`);
    const stream = this.chatService.streamReply(data.message, client.id);
    for await (const chunk of stream) {
      console.log(chunk);
      client.emit('response', chunk);
    }
  }
}
