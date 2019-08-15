import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddbranchComponent } from './addbranch.component';

const routes: Routes = [
  {path: ':cat/:store', component: AddbranchComponent},
  {path: ':cat/:store/:id/:status/:str', component: AddbranchComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddbranchRoutingModule { }
