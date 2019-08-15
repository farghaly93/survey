import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminServices } from '../adminServices.servise';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { BsModalService } from 'ngx-bootstrap';
import { ClientServices } from 'src/app/clientServices.servise';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(public modalService: BsModalService, public adminServices: AdminServices, public clientServices: ClientServices) {}
  categories;
  mess: string;
  loading:boolean =false;
  modalRef;
  id;
  modalmess;

  ngOnInit() {
    this.loading = true;
    this.adminServices.getCategories().subscribe(res=>{
      this.categories = res.cats;
      this.loading = false;
    })
  }
  openModal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template,{ backdrop: 'static', keyboard: false });
    this.id = id;
}
  remove(pass) {
    this.adminServices.isAdmin(pass.value).subscribe(res=>{
      if(res.isAdmin) {
        console.log(this.id);
        this.adminServices.removeCat(this.id).subscribe(res=>{
          if(res.done) {
            this.modalmess = "Removed successfully";
            this.categories = res.cats;
            this.modalRef.hide();
          }else {
             this.modalmess = "error removing store";
          }
        }); 
      }else {
       this.modalmess = 'Wrong password .. you are not authorized..';
      }
      setTimeout(()=>{this.modalmess = null},2000);
    })
  }
}
