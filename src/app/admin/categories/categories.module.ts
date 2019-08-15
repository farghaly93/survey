import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { AdminsidebarModule } from '../adminsidebar/adminsidebar.module';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    AdminsidebarModule,
    HeaderModule
  ]
})
export class CategoriesModule { }
