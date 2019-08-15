import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AddAdRoutingModule } from './addAd-routing.module';
import { addAdComponent } from './addAd.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminsidebarModule } from '../adminsidebar/adminsidebar.module';
import { HeaderModule } from 'src/app/header/header.module';


@NgModule({
  declarations: [
    addAdComponent,
    addAdComponent
  ],
  imports: [
    CommonModule,
    AddAdRoutingModule,
    ReactiveFormsModule,
    AdminsidebarModule,
    HeaderModule,
  ]
})
export class AddAdModule { }
