import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../admin/adminServices.servise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/Observable/combineLatest';
import { ClientServices } from '../clientServices.servise';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stores-main',
  templateUrl: './stores-main.component.html',
  styleUrls: ['./stores-main.component.css']
})
export class StoresMainComponent implements OnInit {

  constructor(config: NgbCarouselConfig,private rout: ActivatedRoute,  private router: Router, private adminervices: AdminServices, private clientServices: ClientServices) { }
  categories = [];
  cat = 'restaurants';
  specs = [];
  sectionsnames = [];
  specsvalues = [];
  sectionsLists = [];
  sectionsvals = [];
  isLoading = false;
  stores = [];
  storecount: number;
  rating = [];
  sectionsurl: string;
  currentpage = 0;
  storescount: number;
  pagelimit = 6;
  filterobject = {};
  link;
 storenames = [];
 pageSizeOptions = [6,9,12,20,23,30];
 mostvisited = [];
 topstores = [];
 ads = [];
 images = [1, 2, 3,4,5,6,7,8,9].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
 back: string;
 topsec1stores = [];
 ctc: string;
 mainloading = false;
 loading = false;
 nop: number;
 locationfilter = 'sections';
 lat = 31;
 lng = 27;
 lang : string;
 toploading = false;
 mostloading = false;
 tabloading = false;
 filterloading = false;
 adloading = false;

 
  ngOnInit() {
    window.scrollTo(0,10);
    this.lang = localStorage.getItem('lang');
    this.clientServices.getlangSub().subscribe(res=>{
      this.lang = res.lang;
      localStorage.setItem('lang', res.lang);
    })


    this.back = '../';
    this.rout.paramMap.subscribe((params: ParamMap)=>{
      if(params.has('cat')) {
        this. cat = params.get('cat');
        this.back += '../'
      }
      this.update();
      this.mostloading = true;
      this.clientServices.mostvisited(this.cat).subscribe(res=>{this.mostvisited=res.most;this.mostloading = false;});
      this.toploading = true;
      this.clientServices.topStores([],this.cat, 'null').subscribe(res=>{this.topstores=res.topmain;this.toploading=false;console.log(this.topstores)});
      this.adloading = true;
      this.adminervices.getads().subscribe(res=>{this.ads = res.ads;this.adloading = false;});
    })
  }
update() {
  this.mainloading = true;
  this.categories = [];
  this.sectionsnames = [];
  this.sectionsvals = [];
  this.specs = [];
  Observable.combineLatest([
    this.adminervices.getCategories(),
    this.adminervices.getQuestions(this.cat),
    this.adminervices.getSections(this.cat),
    this.adminervices.getStores(this.cat),
  ]).subscribe(res => {
    this.mainloading = false;
    res[0].cats.map(cat => {
      this.categories.push(cat);
    });
    this.specs =  res[1].specs;
    const specsnum = this.specs.length;
    for (let s = 1; s < 6; s++) {
      if (res[2].sections['section' + s]) {
        this.sectionsnames[s - 1] = res[2].sections['section' + s];
      }
    }
    this.filterloading = true;
    this.clientServices.unwindspecs(this.cat, specsnum).subscribe(ress => {
    this.specsvalues = ress.values;
    this.filterloading = false;
  });
    this.filterobject = {category: this.cat};
    this.getStores(this.filterobject, 0, this.pagelimit);
    this.clientServices.getSection(this.cat, null, 'no', 0).subscribe(ress => {
    this.sectionsLists[0] = ress.sectionlist;
    this.ctc = this.sectionsLists[0][0];
    this.tabloading = true;
    this.clientServices.topStoresIn([this.sectionsLists[0][0]],this.cat, 'null').subscribe(res=>{
      this.topsec1stores=res.top
      this.tabloading = false;
    });
  });
    this.storenames = res[3].stores;
});
}

  chooseCat(cat) {
    this.cat = cat;
    this.update();
    this.mostloading = true;
    this.clientServices.mostvisited(this.cat).subscribe(res=>{this.mostvisited=res.most; this.mostloading = false;});
    this.toploading = true;
    this.clientServices.topStores([],this.cat, 'null').subscribe(res=>{
      this.topstores=res.topmain;
      this.toploading = false;
    });
  }
  getSectionList(s) {
    const secVal = this.sectionsvals[s];
    this.clientServices.getSection(this.cat, null, secVal, s).subscribe(res => {
        this.sectionsLists[s + 1] = res.sectionlist;
    });
  }
  updateChart(secs, s) {
    this.currentpage = 0;
    const filterObject = this.filterobject;
    delete filterObject['lat'];
    delete filterObject['lng'];
    this.sectionsvals[s] = secs.control.value;
    for (let s = 0; s < this.sectionsvals.length; s++) {
      if (this.sectionsvals[s]) {
        filterObject['section' + (s+1)] = this.sectionsvals[s];
      }
    }
    this.filterobject = filterObject;
    this.getSectionList(s);
    this.getStores(this.filterobject,0,this.pagelimit);
  }



  filter(f) {
    const filterObject = this.filterobject;
    let sp = 1;
    for(let spec of this.specsvalues) {
      if(filterObject['spec'+sp]) {
        delete filterObject['spec'+sp];
      }
      sp++
    }
    const filterarray = [];
    const filtervalues = Object.keys(f.value);
    for (const filtervalue of filtervalues) {
      if (f.value[filtervalue] === true) {
        const farr = filtervalue.split('/');
        filterarray.push(farr[0]);
        filterObject[farr[1]] = filterarray;
        }
      }
    this.isLoading = true;
    this.filterobject = filterObject;
    this.getStores(filterObject, 0, this.pagelimit);
  }

  filterbystore(n) {
    this.filterobject['store'] = n.control.value;
    this.getStores(this.filterobject, 0, this.pagelimit);
  }

  getStores(filterObject, currentpage, pagelimit) {
    const skip = currentpage * pagelimit;
    this.isLoading = true;
    this.clientServices.filterize(filterObject, skip, pagelimit).subscribe(res => {
      this.stores = res.items;
      this.storescount = res.count;
      this.isLoading = false;
      });
  }
  mainstores() {
    this.adminervices.getStores(this.cat).subscribe(res => {
      this.stores = res.stores;
    });
  }
  gotosurvey(storename, mode, st) {
    let secsurl = '';
    if(st !== null) {
      const store = this.stores[st];
      for (let s = 1; s < this.sectionsnames.length + 1; s++) {
        if (store['section' + s]) {
          secsurl += store['section' + s] + '/';
        }
      }
    }
      console.log('url',st, this.stores[0]);
      this.router.navigate(['survey/'+this.cat+'/'+storename+'/'+mode+'/'+secsurl]);
  }
  commingPage(next) {
    if (next === 'next') {
      if (this.currentpage + 1 < this.storescount / this.pagelimit) {this.currentpage = this.currentpage + 1;
      }
      this.getStores(this.filterobject, this.currentpage, this.pagelimit);
        } else if (next === 'previous') {
      if (this.currentpage > 0) {this.currentpage = this.currentpage - 1;
      }
      this.getStores(this.filterobject, this.currentpage, this.pagelimit);
        }
    }
    addnewbrand(nb) {
      if(nb.value) {

      this.link = '../survey/' + this.cat + '/' + nb.control.value+'/new';
      this.router.navigate([this.link]);
      }
    }
    changepagelimit(ps) {
      this.pagelimit = +ps.control.value;
      this.getStores(this.filterobject, this.currentpage, this.pagelimit);
    }
    topsec1(sec) {
      this.tabloading = true;
      this.clientServices.topStoresIn([sec],this.cat, 'null').subscribe(res=>{this.topsec1stores=res.top;this.tabloading = false;});
      this.ctc = sec;
    }
    changelocationfilter(lf) {
      this.locationfilter = lf.value;
    }
    filterbylocation(event) {
      for(let i=1;i<this.sectionsnames.length;i++) {
        delete this.filterobject['section'+i];
      }
      this.filterobject['lat'] = event.coords.lat, this.lat = event.coords.lat;
      this.filterobject['lng'] = event.coords.lng, this.lng = event.coords.lng;
      
      this.getStores(this.filterobject, this.currentpage, this.pagelimit);
    }
    fliplang(m) {
      if(this.lang === 'arabic') {
        if(m==='pull') {
          return "pull-right";
        } else if(m === 'flip') {
          return 'flip';
        }
      }else {
        return '';
      }
    }
    getbranches(name){
      this.filterobject['store'] = name;
      this.getStores(this.filterobject, this.currentpage, this.pagelimit);
      window.scrollTo(20,50);
    }
}
