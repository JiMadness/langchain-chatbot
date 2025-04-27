import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import {
  END,
  MemorySaver,
  MessagesAnnotation,
  START,
  StateGraph,
} from '@langchain/langgraph';
import { LlmService } from './llm.service';
import { RagService } from '../rag/rag.service';

@Injectable()
export class ChatService {
  private app: any;
  private memorySaver: MemorySaver;

  constructor(
    private readonly llmService: LlmService,
    private readonly ragService: RagService,
  ) {
    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are a helpful assistant (Customer Service agent for ${process.env.PRODUCT_URL}).
         Answer all questions to the best of your ability. Use the provided
         context to answer the questions if you can. If the user is not talking
         about the context, don't use the context to answer. 
         Don't use any information outside provided context or share your personal opinion.
         Never mention the word "context", instead use "my knowledge base".
         Here is the context: {context}`,
      ],
      ['placeholder', '{messages}'],
    ]);

    const retrieveContext = async (state: typeof MessagesAnnotation.State) => {
      const message = state.messages[state.messages.length - 1];
      const query = state.messages[state.messages.length - 1].content;
      message['context'] = await this.ragService.getContextForQuery(
        query as string,
      );
    };

    const callModel = async (state: typeof MessagesAnnotation.State) => {
      const context = state.messages[state.messages.length - 1]['context'];

      const prompt = await promptTemplate.invoke({ ...state, context });
      const response = await this.llmService.getModel().invoke(prompt);
      return { messages: [...state.messages, response] };
    };

    const workflow = new StateGraph(MessagesAnnotation)
      .addNode('context', retrieveContext)
      .addNode('model', callModel)
      .addEdge(START, 'context')
      .addEdge('context', 'model')
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
