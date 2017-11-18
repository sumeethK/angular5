import { Status } from './task-status';


export interface Task {

     name: string;
     description: string;
     creationDate: Date;
     targetDate: Date;
     status: Status;
     comments: string;

}
/**
 *  {
 *      name : "Excersise"
 *      ,description : "Excerise is healthy habit"
 *      ,creationDate : new Date()
*      ,targetDate :  new Date()
 *      ,status : "NOT_STARTED"
 *       , comments : "Planning to start today"
 *
 * }
 *
 *
 *
 */
