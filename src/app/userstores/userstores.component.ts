import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../admin/adminServices.servise';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClientServices } from '../clientServices.servise';

@Component({
  selector: 'app-userstores',
  templateUrl: './userstores.component.html',
  styleUrls: ['./userstores.component.css']
})
export class UserstoresComponent implements OnInit {

  constructor(private clientServices:ClientServices, private adminServices: AdminServices, private rout: ActivatedRoute, private router: Router) { }
  cat;
  stores;
  mess: string;
  loading= false;
  sec1;
  sec2;
  sec3;
  sec4;
  items = [];
  sectionscount = [];
  back: string;
  surveysections: string;
  
  ngOnInit() {
    this.loading = true;
    this.rout.paramMap.subscribe((params: ParamMap)=>{
      this.cat = params.get('cat');
      this.sec1 = params.get('sec1');
      let surveysections = '/'+this.sec1;
      if(params.has('sec2')){this.sec2 = params.get('sec2');surveysections +='/'+this.sec2}
      if(params.has('sec3')){this.sec3 = params.get('sec3');surveysections +='/'+this.sec3}
      if(params.has('sec4')){this.sec4 = params.get('sec4');surveysections +='/'+this.sec4}
      this.surveysections = surveysections;
      this.getsectionscount();
    });
  }
  getsectionscount() {
    this.adminServices.getSections(this.cat).subscribe(res=>{
      for(let s=1;s<5;s++) {
        if(res.sections['section'+s]){
          this.sectionscount[s-1] = res.sections['section'+s];
        }
      }
      this.getSections();
      let back = '../../';
      for(let sc of this.sectionscount) {
        back += '../';
      }
      this.back = back;
      console.log(back);
    });
  }
  search(s) {
    this.loading = true;
    this.clientServices.searchstores(s.value.query).subscribe(res=>{
      if(res.stores.length > 0) { 
      this.stores = res.stores;
      this.mess = null;
      }else {
        this.mess = 'NOT FOUND...';
      }
      this.loading = false;
    })
  }
  getSections() {
    let obj={filter:{category: this.cat},find: 'section1'};
    for(let i=1;i<this.sectionscount.length+1;i++){
          if(this['sec'+i]) {
          obj.filter['section'+i] = this['sec'+i];
          if(i===this.sectionscount.length){obj.find='store';}else{obj.find='section'+(i+1);}
        }
    }
    this.clientServices.getsectionItems(obj).subscribe(res=>{
      console.log(res.items);
      if(typeof res.items[0] === 'object') {
        this.stores = res.items;
      }else {
        this.items = res.items;
      }
        console.log(this.items);
      });
  
  }
  addnew(storename) {
    this.adminServices.addStore({name: storename.value, category: this.cat}).subscribe(res=>{
      this.router.navigate(['survey/'+this.cat+'/'+storename.value]);
    })
    
  }

}
