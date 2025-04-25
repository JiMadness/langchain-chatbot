import { Module } from '@nestjs/common';
import { RagService } from './rag.service';
import { CrawlerService } from './crawler.service';
import { EmbeddingService } from './embedding.service';
import { VectorStoreService } from './vector-store.service';

@Module({
  providers: [RagService, CrawlerService, EmbeddingService, VectorStoreService],
  exports: [RagService],
})
export class RagModule {}
