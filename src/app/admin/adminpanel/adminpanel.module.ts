import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminpanelRoutingModule } from './adminpanel-routing.module';
import { AdminpanelComponent } from './adminpanel.component';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';
import { AdminsidebarModule } from '../adminsidebar/adminsidebar.module';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  declarations: [
    AdminpanelComponent,
  ],
  imports: [
    CommonModule,
    AdminpanelRoutingModule,
    AdminsidebarModule,
    HeaderModule
  ]
})
export class AdminpanelModule { }
