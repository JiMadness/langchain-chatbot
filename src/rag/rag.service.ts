import { Injectable } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { VectorStoreService } from './vector-store.service';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

@Injectable()
export class RagService {
  constructor(
    private readonly crawlerService: CrawlerService,
    private readonly vectorStoreService: VectorStoreService,
  ) {}

  async ingestWebsite(url: string) {
    const documents = await this.crawlerService.crawlRecursively(url);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await splitter.splitDocuments(documents);

    await this.vectorStoreService.getVectorStore().addDocuments(splitDocs);
  }

  async getContextForQuery(query: string): Promise<string> {
    const relevantDocs = await this.vectorStoreService
      .getVectorStore()
      .invoke(query);

    return relevantDocs.map((doc) => doc.pageContent).join('\n');
  }
}
