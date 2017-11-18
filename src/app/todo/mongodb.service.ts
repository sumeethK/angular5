import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { TodoItem } from './model/todo-item';


@Injectable()
export class MongodbService {
  private _hostUrl = environment.restservice.host;
  private _getUrl = this._hostUrl.concat('api/todoList');
  private _postUrl = this._hostUrl.concat('api/todo');
  private _putUrl = this._hostUrl.concat('api/todo/');
  private _deleteUrl = this._hostUrl.concat('api/todo/');



  constructor(private _http: Http) { }
  addTodo(todo: any): any {
    const headers = new Headers();
    // headers.append('Access-Control-Allow-Headers', 'Content-Type');
    // headers.append('Access-Control-Allow-Methods', 'GET');
    // headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    return this._http.post(this._postUrl, JSON.stringify(todo), options)
      .map((response: Response) => response.json());
  }
  delete(todo: TodoItem): any {
    return this._http.delete(this._deleteUrl + todo._id)
    .map((response: Response) => response.json());
  }

  updateTodo(todo: TodoItem): any {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.put(this._putUrl + todo._id, JSON.stringify(todo), options)
    .map((response: Response) => response.json());
  }

  getAllTodos() {
    return this._http.get(this._getUrl)
      .map((res: Response) => res.json());
  }




}
