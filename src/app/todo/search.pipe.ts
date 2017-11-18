import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(todos: any, name: any): any {
    if(name === undefined || name == null) {
      return todos;
    }

    return todos.filter(function(todo){
        return todo.task.name.toLowerCase().includes(name.toLowerCase());
    });


    }

}
