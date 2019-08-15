import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey.component';

const routes: Routes = [
  {path: ':cat/:id/:mode', component: SurveyComponent},
  {path: ':cat/:id/:mode/:sec1', component: SurveyComponent},
  {path: ':cat/:id/:mode/:sec1/:sec2', component: SurveyComponent},
  {path: ':cat/:id/:mode/:sec1/:sec2/:sec3', component: SurveyComponent},
  {path: ':cat/:id/:mode/:sec1/:sec2/:sec3/:sec4', component: SurveyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
