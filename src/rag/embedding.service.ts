import { Injectable } from '@nestjs/common';
import { FlagEmbedding } from 'fastembed';
import { EmbeddingsInterface } from '@langchain/core/embeddings';

@Injectable()
export class EmbeddingService implements EmbeddingsInterface {
  private embeddingModel: FlagEmbedding;

  async embedDocuments(documents: string[]): Promise<number[][]> {
    for await (const value of (await this.getEmbeddingModel()).embed(
      documents,
      Infinity,
    )) {
      return value;
    }

    throw new Error("Generator didn't yield any value");
  }

  async embedQuery(document: string): Promise<number[]> {
    return (await this.getEmbeddingModel()).queryEmbed(document);
  }

  private async getEmbeddingModel() {
    if (!this.embeddingModel) {
      this.embeddingModel = await FlagEmbedding.init();
    }

    return this.embeddingModel;
  }
}
