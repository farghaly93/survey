import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoresMainComponent } from './stores-main.component';

const routes: Routes = [
  {path: '', component: StoresMainComponent},
  {path: ':cat', component: StoresMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StroesMainRoutingModule { }
