import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserscategoriesComponent } from './categories.component';

const routes: Routes = [
  {path: '', component: UserscategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserscategoriesRoutingModule { }
