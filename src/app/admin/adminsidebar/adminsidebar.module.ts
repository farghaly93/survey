import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsidebarRoutingModule } from './adminsidebar-routing.module';
import { AdminsidebarComponent } from './adminsidebar.component';


@NgModule({
  declarations: [
    AdminsidebarComponent
  ],
  imports: [
    CommonModule,
    AdminsidebarRoutingModule
  ],
  exports: [
    AdminsidebarComponent
  ]
})
export class AdminsidebarModule { }
