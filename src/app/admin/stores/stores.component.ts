import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminServices } from '../adminServices.servise';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClientServices } from 'src/app/clientServices.servise';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  constructor(private modalService: BsModalService, private clientServices: ClientServices, private adminServices: AdminServices, private route: ActivatedRoute) { }
  stores;
  mess: string;
  modalmess: string;
  loading:boolean =false;
  cat;
  modalRef: BsModalRef;
  id: string;

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.cat = params.get('cat');
    });
    this.getStores();
  }
  openModal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template,{ backdrop: 'static', keyboard: false });
    this.id = id;
}
  getStores() {
    this.loading = true;
    this.adminServices.getStores(this.cat).subscribe(res=>{
      this.stores = res.stores;
      this.loading = false;
    })
  }
  remove(pass) {
    this.adminServices.isAdmin(pass.value).subscribe(res=>{
      if(res.isAdmin) {
        this.modalRef.hide();
        this.adminServices.removeStore(this.id, this.cat).subscribe(res=>{
          if(res.done) {
            this.modalmess = "Removed successfully";
            this.stores = res.stores;
          }else {
             this.modalmess = "error removing store";
          }
        }); 
      }else {
       this.modalmess = 'Wrong password .. you are not authorized..';
        console.log(this.mess);
      }
      setTimeout(()=>{this.modalmess = null},2000);
    })
  }
  search(q) {
    if(q.value) {
      this.loading = true;
      this.clientServices.searchstores(q.control.value).subscribe(res=>{
        this.stores = res.stores;
        if(this.stores.length===0) {
          this.mess = 'Not found';
        }else {
          this.mess =null;
        }
        this.loading = false;
      })
    }
  }
}
