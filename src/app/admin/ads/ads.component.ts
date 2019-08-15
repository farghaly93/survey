import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent extends CategoriesComponent implements OnInit {

  ads = []

  ngOnInit() {
    this.adminServices.getads().subscribe(res=>{
      this.ads = res.ads;
    });
}
    openModal(template: TemplateRef<any>, id) {
      this.modalRef = this.modalService.show(template,{ backdrop: 'static', keyboard: false });
      this.id = id;
  }
    remove(pass) {
      this.adminServices.isAdmin(pass.value).subscribe(res=>{
        if(res.isAdmin) {
          console.log(this.id);
          this.adminServices.deletead(this.id).subscribe(res=>{
            if(res._id) {
              this.modalmess = "Removed successfully";
              let index = this.ads.findIndex((st)=>{return st._id===res._id;});
              this.ads.splice(index, 1);
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
