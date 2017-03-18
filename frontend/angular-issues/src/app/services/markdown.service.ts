import { Injectable } from '@angular/core';

import * as marked from 'marked';

@Injectable()
export class MarkdownService {

  parse(rawText: string): string {
    marked.setOptions({ sanitize: true });
    return marked(rawText);
  }

}
