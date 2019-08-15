import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StroesMainRoutingModule } from './stroes-main-routing.module';
import { StoresMainComponent } from './stores-main.component';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EllipsisPipe } from '../pipes/ellipsised-string.pipe';
import { CeilPipe } from '../pipes/ceil.pipe';
import { AgmCoreModule } from '@agm/core';
import { TranslateModule } from '../pipes/translate.module';

@NgModule({
  declarations: [
    StoresMainComponent,
    CeilPipe
  ],
  imports: [
    CommonModule,
    StroesMainRoutingModule,
    FormsModule,
    HeaderModule,
    FooterModule,
    NgbModule,
    TranslateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCna7uhO_7jETlatBZhHcwNGTIxVe7h7pE'
    })
  ]
})
export class StroesMainModule { }
