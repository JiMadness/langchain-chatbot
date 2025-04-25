import { Injectable } from '@nestjs/common';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { EmbeddingService } from './embedding.service';

@Injectable()
export class VectorStoreService {
  private readonly vectorStore: MemoryVectorStore;

  constructor(embeddingService: EmbeddingService) {
    this.vectorStore = new MemoryVectorStore(embeddingService);
  }

  getVectorStore() {
    return this.vectorStore.asRetriever();
  }
}
