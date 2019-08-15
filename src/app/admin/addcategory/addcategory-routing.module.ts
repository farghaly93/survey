import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddcategoryComponent } from './addcategory.component';

const routes: Routes = [
  {path: '', component: AddcategoryComponent},
  {path: ':cat', component: AddcategoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddcategoryRoutingModule { }
