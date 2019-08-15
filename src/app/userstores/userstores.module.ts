import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserstoresRoutingModule } from './userstores-routing.module';
import { UserstoresComponent } from './userstores.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserstoresComponent
  ],
  imports: [
    CommonModule,
    UserstoresRoutingModule,
    FormsModule
  ]
})
export class UserstoresModule { }
