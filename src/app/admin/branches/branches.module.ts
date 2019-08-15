import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesRoutingModule } from './branches-routing.module';
import { BranchesComponent } from './branches.component';
import { FormsModule } from '@angular/forms';
import { AdminsidebarModule } from '../adminsidebar/adminsidebar.module';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  declarations: [
    BranchesComponent
  ],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    FormsModule,
    AdminsidebarModule,
    HeaderModule
  ]
})
export class BranchesModule { }
