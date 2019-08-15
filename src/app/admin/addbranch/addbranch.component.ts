import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminServices } from '../adminServices.servise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/Observable/combineLatest';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from '../add-store/mimetype.validator';
import { ClientServices } from 'src/app/clientServices.servise';

@Component({
  selector: 'app-addbranch',
  templateUrl: './addbranch.component.html',
  styleUrls: ['./addbranch.component.css']
})
export class AddbranchComponent implements OnInit {

  constructor(private clientServices: ClientServices, private adminServices: AdminServices, private route: ActivatedRoute) { }
  cat;
  store;
  sections = [];
  specs = [];
  done = false;
  lat = 27;
  lng = 31;
  zoom = 8;
  id: string;
  mode = 'add';
  branch;
  status;
  str;
  phone: number;
  address: string;
  review: string;
  form: FormGroup;
  imgPreview: any;
  sectionsLists = [];
  secs = [];

  ngOnInit() {
    setTimeout(()=>{this.lat=30;this.lng=30},3000);
    this.form = new FormGroup({
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] }),
    })

    this.route.paramMap.subscribe(params=>{
      this.cat = params.get('cat');
      this.store = params.get('store');
      this.status = params.get('status');
      this.str = params.get('str');
      if(params.has('id')) {
        this.id=params.get('id');
        this.mode = 'edit';
        }
        Observable.combineLatest(
          this.adminServices.getbranch(this.id),
          this.adminServices.getSections(this.cat),
          this.adminServices.getQuestions(this.cat),
          this.clientServices.getSection(this.cat,null,'no', 0),
        ).subscribe(res=>{
          let secs = [];
          for(let i=1;i<6;i++) {
            if(res[1].sections['section'+i]) {
              secs[i-1] = res[1].sections['section'+i]; 
            }
          }
          this.secs = secs;
          ////////////////////////////////////////////
          this.specs = res[2].specs;
          ////////////////////////////////////////////
          if(params.has('id')) {
            this.branch = res[0].branch;
          for(let sec=1;sec<6;sec++) {
            if(res[0].branch['section'+sec]) {
              this.sections[sec-1] = res[0].branch['section'+sec];
            }
          }
          this.phone = res[0].branch['phone'];
          this.address = res[0].branch['address'];
          this.review = res[0].branch['review'];
          for(let sp=1;sp<6;sp++) {
            if(res[0].branch['spec'+sp]) {
              this.specs[sp-1] = res[0].branch['spec'+sp];
            }
          }
          this.lat = res[0].branch.lat;
          this.lng = res[0].branch.lng;
          }
          this.sectionsLists[0] = res[3].sectionlist;
        });
    });
  }
  addbranch(b) {
    if(b.valid) {
      const obj = b.value;
      obj['lat'] = this.lat;
      obj['lng'] = this.lng;
      obj['category'] = this.cat;
      obj['store'] = this.store;
      console.log(obj);
      const find = this.id?this.branch:obj;
      const body = {obj, find};
      for(let b in body) {
        if(typeof body[b]==='string'){
          body[b] = body[b].toLowerCase();
        }
      }
       
      if(this.str==='null') {
        this.adminServices.addStore({name: this.store, category: this.cat, image: this.form.get('image').value, desc: 'kokowawa'}).subscribe(res=>{
          console.log('image uploaded');   
        });
      }
      setTimeout(()=>{
        this.adminServices.addbranch(body).subscribe(res=>{
          if(res.done) {
          this.done = true;
          this.branch = res.branch;
          }else {
            this.done = true;
          }
        });
      },300);
         
    }   
  }
  getLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
  changename(n) {
    this.store = n.control.value.toLowerCase();
  }

  onPhotoUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgPreview = reader.result;
    };
  }

  getSectionList(d, s) {
    const secVal = d.value;
      this.clientServices.getSection(this.cat,null,secVal, s).subscribe(res=>{
          this.sectionsLists[s+1] = res.sectionlist;
      });
  }

}
