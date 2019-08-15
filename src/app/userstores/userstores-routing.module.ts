import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserstoresComponent } from './userstores.component';

const routes: Routes = [
  {path: ':cat', component: UserstoresComponent},
  {path: ':cat/:sec1', component: UserstoresComponent},
  {path: ':cat/:sec1/:sec2', component: UserstoresComponent},
  {path: ':cat/:sec1/:sec2/:sec3', component: UserstoresComponent},
  {path: ':cat/:sec1/:sec2/:sec3/:sec4', component: UserstoresComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserstoresRoutingModule { }
