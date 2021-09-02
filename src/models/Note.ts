import { v4 as uuid } from 'uuid';

export class Note {
  title: string;
  content: string;
  id: string;

  constructor(title: string, content?: string) {
    this.id = uuid();
    this.title = title;
    this.content = content? content : "";
  }
}
