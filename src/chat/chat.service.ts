import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import {
  START,
  END,
  StateGraph,
  MemorySaver,
  MessagesAnnotation,
} from '@langchain/langgraph';
import { LlmService } from './llm.service';

@Injectable()
export class ChatService {
  private app: any;
  private memorySaver: MemorySaver;

  constructor(private llmService: LlmService) {
    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        'system',
        'You are a helpful assistant (Customer Service agent for Yassir). Answer all questions to the best of your ability.',
      ],
      ['placeholder', '{messages}'],
    ]);

    const callModel = async (state: typeof MessagesAnnotation.State) => {
      const prompt = await promptTemplate.invoke(state);
      const response = await this.llmService.getModel().invoke(prompt);
      return { messages: [...state.messages, response] };
    };

    const workflow = new StateGraph(MessagesAnnotation)
      .addNode('model', callModel)
      .addEdge(START, 'model')
      .addEdge('model', END);

    this.memorySaver = new MemorySaver();
    this.app = workflow.compile({ checkpointer: this.memorySaver });
  }

  async getReply(input: string, threadId?: string) {
    const thread = threadId || uuidv4();
    const config = { configurable: { thread_id: thread } };
    const messages = [{ role: 'user', content: input }];
    const output = await this.app.invoke({ messages }, config);
    return {
      reply: this.trimReply(
        output.messages[output.messages.length - 1].content,
      ),
      threadId: thread,
    };
  }

  async *streamReply(input: string, threadId?: string) {
    yield await this.getReply(input, threadId);
  }

  private trimReply(content: string): string {
    return content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  }
}
