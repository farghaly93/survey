import { Component, OnInit, TemplateRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/Observable/combineLatest';
import { ClientServices } from '../../clientServices.servise';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { CategoriesComponent } from '../categories/categories.component';
import { AdminServices } from '../adminServices.servise';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-stores-main',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent extends CategoriesComponent implements OnInit {
  categories = [];
  cat = "restaurants";
  specs = [];
  sectionsnames = [];
  specsvalues = [];
  isLoading: boolean = false;
  stores = [];
  rating = [];
  sectionsurl: string;
  currentpage: number = 0;
  storescount: number;
  pagelimit: number = 15;
  nop: number;
  filterobject = {};
  link;
  sectionsLists = [];
  sectionsvalues = [];
  store;
  
  rowCollection = [
    {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
    {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
    {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
];

  ngOnInit() {
    this.update();
}
update() {
  this.categories = [];
  this.sectionsnames = [];
  this.specs = [];
  this.currentpage = 1;
  Observable.combineLatest(
    this.adminServices.getCategories(),
    this.adminServices.getQuestions(this.cat),
    this.adminServices.getSections(this.cat),
    this.clientServices.getSection(this.cat,null,'no', 0),
  ).subscribe(res=>{
    res[0].cats.map(cat=>{
      this.categories.push(cat);
    });
    this.sectionsLists[0] = res[3].sectionlist;
    this.specs =  res[1].specs;
    let specsnum = this.specs.length;
    for(let s=1;s<6;s++){
      if(res[2].sections['section'+s]) {
        this.sectionsnames[s-1] = res[2].sections['section'+s];
      }
    }
      this.clientServices.unwindspecs(this.cat, specsnum).subscribe(res=>{
        this.specsvalues = res.values;
    });
    this.filterobject = {category: this.cat};
    this.getStores(this.filterobject, this.currentpage, this.pagelimit);
});
}

openModal(template: TemplateRef<any>, store) {
  this.modalRef = this.modalService.show(template,{ backdrop: 'static', keyboard: false });
  this.store = store;
}


  chooseCat(cat) {
    this.cat = cat;
    this.update();
  }
  getSectionList(s) {
    const secVal = this.sectionsvalues[s];
      this.clientServices.getSection(this.cat,null,secVal, s).subscribe(res=>{
          this.sectionsLists[s+1] = res.sectionlist;
      });
  }
  updateChart(secs, s) {
    this.currentpage = 0;
    let i = 1;
    let filterObject = this.filterobject;
    for(let sec of this.sectionsnames) {
      if(secs.name === 'section'+i) {
        this.sectionsvalues[i-1] = secs.control.value;
        filterObject['section'+i] = secs.control.value;
      }
      i++;
    }
    this.filterobject = filterObject;
    console.log(this.filterobject);
      this.getSectionList(s);
      this.getStores(this.filterobject,this.currentpage, this.pagelimit);
  } 
  filter(f) {
    let filterObject = {category: this.cat};
    for(let s=1; s<this.sectionsnames.length+1;s++) {
      if(f.value['section'+s]) {
        filterObject['section'+s] = f.value['section'+s];
      }
    }
      this.isLoading = true;
      this.filterobject = filterObject;
      this.getStores(filterObject, 0, 5);
  }
  getStores(filterObject, currentpage, pagelimit) {
    let skip = currentpage*pagelimit;
    this.isLoading = true;
    this.adminServices.getbranchs(filterObject, skip, pagelimit).subscribe(res => {
      this.stores = res.items.sort(function(a: {status:string}, b: {status:string}) {
        if (a.status < b.status)
          return 1;
        if (a.status > b.status)
          return 1;
        return 0;
      });
      this.storescount = res.count;
      this.nop = Math.ceil(this.storescount/this.pagelimit);
      this.isLoading = false;
      });
  }
  commingPage(next) {
    if(next==='next') {
      console.log(this.currentpage+1, this.storescount/this.pagelimit);
      if(this.currentpage+1<this.storescount/this.pagelimit) {this.currentpage = this.currentpage+1;}
      this.getStores(this.filterobject, this.currentpage, this.pagelimit);
        }
    else if(next==='previous') {
      if(this.currentpage > 0) {this.currentpage = this.currentpage-1;}
      this.getStores(this.filterobject, this.currentpage, this.pagelimit);
        }
    }

    remove(pass) {
      this.adminServices.isAdmin(pass.value).subscribe(res=>{
        if(res.isAdmin) {
          console.log(this.id);
          this.adminServices.deletebranch(this.store).subscribe(res=>{
            if(res._id) {
              let index = this.stores.findIndex((st)=>{return st._id===res._id;});
              this.stores.splice(index, 1);
              this.modalmess = "Removed successfully";
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
