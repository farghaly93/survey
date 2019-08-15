import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserscategoriesRoutingModule } from './categories-routing.module';
import { UserscategoriesComponent } from './categories.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [
    UserscategoriesComponent
  ],
  imports: [
    CommonModule,
    UserscategoriesRoutingModule,
    HeaderModule,
    FooterModule
  ]
})
export class UserscategoriesModule { }
