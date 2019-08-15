import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { addAdComponent } from './addAd.component';


const routes: Routes = [
  {path: '', component: addAdComponent},
  {path: ':name', component: addAdComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAdRoutingModule { }
