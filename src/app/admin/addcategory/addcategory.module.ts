import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddcategoryRoutingModule } from './addcategory-routing.module';
import { AddcategoryComponent } from './addcategory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminsidebarModule } from '../adminsidebar/adminsidebar.module';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  declarations: [
    AddcategoryComponent
  ],
  imports: [
    CommonModule,
    AddcategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdminsidebarModule,
    HeaderModule
  ]
})
export class AddcategoryModule { }
