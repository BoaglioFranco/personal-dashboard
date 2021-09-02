import {v4 as uuid} from 'uuid';

export class Todo {
    id: string;
    text: string;
    completed: boolean;

    constructor(text: string){
        this.id = uuid();
        this.text = text;
        this.completed = false
    }
}