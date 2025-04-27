import { Injectable } from '@nestjs/common';
import { RecursiveUrlLoader } from './lib/recursive-url-loader';
import { Document } from '@langchain/core/documents';
import { compile } from 'html-to-text';

@Injectable()
export class CrawlerService {
  async crawlRecursively(url: string, maxDepth = 100): Promise<Document[]> {
    const compiledConvert = compile({ wordwrap: 130 });

    const loader = new RecursiveUrlLoader(url, {
      extractor: compiledConvert,
      maxDepth,
      timeout: 10000,
      excludeDirs: [],
      preventOutside: true,
    });

    const result = await loader.load();

    console.log(result.map(doc => doc.metadata));

    return result;
  }
}
