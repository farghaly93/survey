import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareRoutingModule } from './compare-routing.module';
import { CompareComponent } from './compare.component';
import { SurveyModule } from '../survey/survey.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';



@NgModule({
  declarations: [
    CompareComponent,
  ],
  imports: [
    CommonModule,
    CompareRoutingModule,
    SurveyModule,
    NgbModule,
    HeaderModule,
    FooterModule
  ],
})
export class CompareModule { }
