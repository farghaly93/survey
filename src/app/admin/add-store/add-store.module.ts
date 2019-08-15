import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStoreRoutingModule } from './add-store-routing.module';
import { AddStoreComponent } from './add-store.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';
import { AdminsidebarModule } from '../adminsidebar/adminsidebar.module';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  declarations: [
    AddStoreComponent,
  ],
  imports: [
    CommonModule,
    AddStoreRoutingModule,
    ReactiveFormsModule,
    AdminsidebarModule,
    HeaderModule
  ]
})
export class AddStoreModule { }
