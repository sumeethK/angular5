import { Task } from './task';


export interface TodoItem {

    _id: number ;
    task: Task;
    creator: string;
    assignee: string;

}
