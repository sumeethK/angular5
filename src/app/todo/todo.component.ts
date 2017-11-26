import { NotificationType , Notification} from './../notification';
import { Component, OnInit, Input } from '@angular/core';
import { MongodbService } from './mongodb.service';
import { TodoItem } from './model/todo-item';
import { Status } from './model/task-status';
import { fadeIn, done } from '../animation';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  animations: [
    fadeIn,
    done
  ],
  providers: [MongodbService],
})
export class TodosComponent implements OnInit {
  todosList: TodoItem[];
  todo: TodoItem;
  @Input() todoSearch;
  appState: AppStatus = AppStatus.ADD;

  constructor(private _mongoService: MongodbService, private _notification: NotificationService) { }

  initializeTodo() {
    this.todo = {
      _id: 0,
      task: {
        name: 'Name'
        , description: 'Description'
        , creationDate: new Date()
        , targetDate: new Date()
        , status: Status.IN_PROGRESS
        , comments: 'comment'

      },
      creator: 'Admin',
      assignee: 'DJ',
    };
  }

  ngOnInit() {
    console.log('Initializing todos component..');
    this._mongoService.getAllTodos()
      .subscribe(resTodo => {
        this.todosList = resTodo;
      }
      );
    this.initializeTodo();
  }


  addTodo() {
    if (this.todo != null || this.todo !== undefined) {
      this._notification.changeMessage(new Notification(NotificationType.ADD, 'intialied...'));
      console.log('Adding new task  \'' + this.todo.task.name);
      this.todo._id = 0;
      const tmp: TodoItem = this.createNewFrom(this.todo);
      if (this.todosList == null) {
        this.todosList = [];
      }
      this._mongoService.addTodo(tmp).subscribe(addedTodo => {
        this.todosList.push(addedTodo);
        console.log('Added new task  \'' + addedTodo.task.name);
      });

    }
  }


  createNewFrom(newTodo): TodoItem {
    const tmp: TodoItem = {
      _id: newTodo._id,
      task: {
        name: newTodo.task.name
        , description: newTodo.task.description
        , creationDate: newTodo.task.creationDate
        , targetDate: newTodo.task.targetDate
        , status: newTodo.task.status
        , comments: newTodo.task.comments
      },
      creator: newTodo.creator,
      assignee: newTodo.assignee,
    };
    return tmp;

  }

  // private nextId(): number {
  //   if (this.todosList == null || this.todosList === undefined) {
  //     return 1;
  //   }
  //   let maxId = 0;
  //   for (let i = 0; i < this.todosList.length; i++) {
  //     if (this.todosList[i]._id > maxId) {
  //       maxId = this.todosList[i]._id;
  //     }
  //   }
  //   return ++maxId;
  // }

  deleteTodo(toBeDeleted) {
    this._mongoService.delete(toBeDeleted)
      .subscribe(deletedTodo => {
        for (let i = 0; i < this.todosList.length; i++) {
          if (this.todosList[i]._id === toBeDeleted._id) {
            console.log('Task \'' + this.todosList[i].task.name + '\' deleted ');
            this.todosList[i].task.status = Status.DELETED;
            this.todosList.splice(i, 1);
            break;
          }
        }


      })
      ;
  }

  done(toBeDone) {
    // for (let i = 0; i < this.todosList.length; i++) {
    //   if (this.todosList[i]._id === toBeDone._id) {
    //     console.log('Task \'' + this.todosList[i].task.name + '\' comped ');
    //     this.todosList[i].task.status = Status.COMPLETED;
    //     break;
    //   }
    // }
    toBeDone.task.status = Status.COMPLETED;
    this.updateTodo(toBeDone);
    // this._mongoService.addAllTodos(this.todosList);
  }
  isDone(todo) {
    if (todo.task.status === Status.COMPLETED) {
      return true;
    } else { return false; }
  }

  deleteAll() {
    // this.todosList = [];
    // this._mongoService.addAllTodos(this.todosList);
  }

  enableEditMode(todoTobeUpdated) {
    this.appState = AppStatus.EDIT;
    this.todo = todoTobeUpdated;
  }

  disableEditMode() {
    this.appState = AppStatus.ADD;
    this.ngOnInit();
  }

  refresh() {
    this.ngOnInit();
  }

  isEditable(): boolean {
    if (this.appState === AppStatus.EDIT) {
      return true;
    } else { return false; }
  }

  isNotEmpty(): boolean {
    if (this.todosList === undefined || this.todosList == null || this.todosList.length === 0) {
      return false;
    } else { return true; }
  }

  updateTodo(todoToBeUpdated) {
    let tmp: TodoItem;
    if (todoToBeUpdated == null && todoToBeUpdated === undefined) {
      tmp = this.todo;
    } else {
      tmp = todoToBeUpdated;
    }
    this._mongoService.updateTodo(tmp)
      .subscribe(updatedTodo => {
        for (let i = 0; i < this.todosList.length; i++) {
          if (this.todosList[i]._id === tmp._id) {
            console.log('Updated successfully   \'' + this.todosList[i].task.name);
            this.todosList[i] = tmp;
            break;
          }
        }
      })
      ;

  }




}

enum AppStatus { DEFAULT, ADD, EDIT }
