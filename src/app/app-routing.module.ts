import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './todo/todo.component';

const routes: Routes = [
  {path: 'todo', component: TodosComponent}
  // ,{path: '**', redirectTo: '/todo', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
