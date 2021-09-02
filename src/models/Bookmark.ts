import { v4 as uuid } from 'uuid';

export class Bookmark {

    id: string;
    name: string;
    url: URL;

    constructor(name: string, url: string) {
        this.id = uuid();
        this.name = name;
        this.url = new URL(url);
      }
}