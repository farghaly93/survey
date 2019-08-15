import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import { StoresRoutingModule } from './stores-routing.module';
import { StoresComponent } from './stores.component';
import { EllipsisPipe } from 'src/app/pipes/ellipsised-string.pipe';
import { FormsModule } from '@angular/forms';
import { AdminsidebarModule } from '../adminsidebar/adminsidebar.module';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  declarations: [
    StoresComponent,
    EllipsisPipe
  ],
  imports: [
    CommonModule,
    StoresRoutingModule,
    FormsModule,
    AdminsidebarModule,
    HeaderModule,
    ModalModule.forRoot()
  ],
  providers: [BsModalRef]
})
export class StoresModule { }
