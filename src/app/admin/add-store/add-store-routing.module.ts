import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStoreComponent } from './add-store.component';

const routes: Routes = [
  {path: ':cat', component: AddStoreComponent},
  {path: ':cat/:name', component: AddStoreComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddStoreRoutingModule { }
