import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import * as process from 'node:process';

@Injectable()
export class LlmService {
  private readonly model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      openAIApiKey: process.env.OPENROUTER_API_KEY,
      configuration: {
        baseURL: process.env.OPENROUTER_BASE_URL,
      },
      model: process.env.LLM_MODEL,
    });
  }

  getModel() {
    return this.model;
  }
}
