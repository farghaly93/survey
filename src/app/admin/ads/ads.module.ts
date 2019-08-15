import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsRoutingModule } from './ads-routing.module';
import { AdsComponent } from './ads.component';
import { FormsModule } from '@angular/forms';
import { AdminsidebarModule } from '../adminsidebar/adminsidebar.module';
import { HeaderModule } from 'src/app/header/header.module';


@NgModule({
  declarations: [AdsComponent, AdsComponent],
  imports: [
    CommonModule,
    AdsRoutingModule,
    FormsModule,
    AdminsidebarModule,
    HeaderModule
  ]
})
export class AdsModule { }
