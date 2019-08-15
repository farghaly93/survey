import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddbranchRoutingModule } from './addbranch-routing.module';
import { AddbranchComponent } from './addbranch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AdminsidebarModule } from '../adminsidebar/adminsidebar.module';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  declarations: [
    AddbranchComponent
  ],
  imports: [
    CommonModule,
    AddbranchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdminsidebarModule,
    HeaderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCna7uhO_7jETlatBZhHcwNGTIxVe7h7pE'
    })
  ]
})
export class AddbranchModule { }
