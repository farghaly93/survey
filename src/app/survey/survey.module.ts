import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SurveyComponent } from './survey.component';
import { SurveyRoutingModule } from './survey-routing.module';
import { AgmCoreModule } from '@agm/core';
import { TrimPipe } from '../pipes/trim.pipe';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { TranslateModule } from '../pipes/translate.module';

@NgModule({
  declarations: [
    SurveyComponent,
    TrimPipe,
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    FormsModule,
    HeaderModule,
    FooterModule,
    TranslateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCna7uhO_7jETlatBZhHcwNGTIxVe7h7pE'
    })
  ],
  exports: [
    SurveyComponent
  ]
})
export class SurveyModule { }
