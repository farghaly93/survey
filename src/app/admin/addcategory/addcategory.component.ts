import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../adminServices.servise';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  constructor(private adminservices: AdminServices, private router: ActivatedRoute) { }
  name: string = 'restaurant';
  qs = [];
  mess: string;
  mode = 'add';
  id: string;
  choose = [];
  chs = [];
  done = [];
  sdone = false;
  spdone = false;
  sections = ['sec'];
  addchoices = false;
  loading: boolean = false;
  specs = ['spec'];

  ngOnInit() {
    this.router.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('cat')) {
        this.name = paramMap.get('cat');
        this.mode = 'edit';
        this.loading = true;
          this.adminservices.getSections(this.name).subscribe(res=>{
            let secs = [];
            for(let i=1;i<6;i++) {
              if(res.sections['section'+i]) {
                secs[i-1] = res.sections['section'+i]; 
              }
            }
            this.sections = secs;
            this.loading = false;
          });
          this.loading = true;
          this.adminservices.getChoices(this.name).subscribe(res=>{
            this.chs = res.allchoices;
            this.loading = false;
          });
          this.loading = true;
          this.adminservices.getQuestions(this.name).subscribe(res=>{
            console.log(this.name);
            this.qs = res.questions;
            this.specs = res.specs;
            this.loading = false;
          });
      }
    });
  }
  addinputs(name, num) {
    this.qs = [];
    console.log(name.control.value);
    this.name = name.control.value;
    for(let i=0; i<(num.control.value); i++){
      const arr = this.qs;
      arr[i] = null;
    }
  }
  addcategory(form) {
    if(form.valid && form.value['q1']&&form.value['ch1/1']&&form.value['ch2/1']) {
    const cat = {name: this.name};
    const num = this.qs.length;
    if(this.mode === 'edit') cat['mode'] = 'edit';
    for(let i=1;i<num+1;i++) {
      if(form.value['q'+i]) {
        cat['q'+i] = form.value['q'+i];
      }
    }
      this.adminservices.addcat(cat).subscribe(res=>{
        if(res.added) {
        for(let i=1;i<num+1;i++) {
        let body = {category: this.name};
        if(this.mode === 'edit') body['mode'] = 'edit';
        for(let j=1;j<7;j++) {
        if(form.value['ch'+i+'/'+j]) {
          body['ch'+j] = form.value['ch'+i+'/'+j];
         }
        }
        if(form.value['type'+i]) {
          body['type'] = form.value['type'+i];
        }
        if(form.value['q'+i]) {
          body['question'] = 'q'+i;
        }
        for(let b in body) {
          if(typeof body[b]==='string'){
            body[b] = body[b].toLowerCase();
          }
        }
       this.adminservices.addQuestion(body).subscribe(res=>{
        if(res.added) {
        this.done.push(i+1);
        }
       });
      }
      this.mess = 'This category added successfully...';
    }else {this.mess = 'This category already exist...'}
    });
    }else {this.mess = 'complete your data'}
    setTimeout(()=>{this.mess=null},3000);
    this.mode = 'edit';
  }
  more() {
    const length = this.qs.length;
    this.qs[length] = length;
  }
  less() {
    const length = this.qs.length;
    if(length>1){
    this.qs.pop();
    }
  }
  noc(c,i) {
    const choose = this.choose;
    if(c ==="choose") {
      choose.push(i);
    }else {
      if(choose.includes(i)) {
        choose.splice(choose.indexOf(i),1);
        this.chs[i] = [];
      }
    }
  }
  choicesInputs(i, n) {
    let subarr = [];
    for(let i=0; i<n; i++) { subarr.push(i);}
    this.chs[i] = subarr;
  }
  add() {
    this.sections.push('section');
  }
  remove() {
    this.sections.pop();
  }
  addsubsections(s) {
    if(s.valid && this.name) {
      if(this.mode === 'edit') s.value['mode'] = 'edit';
    s.value.category = this.name;
    const svalue = s.value;
    for(let s in svalue) {
      if(typeof svalue[s]==='string'){
        svalue[s] = svalue[s].toLowerCase();
      }
    }
    console.log(svalue);
    this.adminservices.addSections(svalue).subscribe(res=>{
      if(res.done) {
      this.sdone = true;
      setTimeout(()=>{this.sdone=false},3000);
       }
      });
    }
  }
  addspec() {
    this.specs.push('spec');
  }
  removespec() {
    this.specs.pop();
  }
  addspecs(sp) {
    if(sp.valid && this.name && sp.value['spec1']) {
      const spvalue = sp.value;
      for(let sp in spvalue) {
        if(typeof spvalue[sp]==='string'){
          spvalue[sp] = spvalue[sp].toLowerCase();
        }
      }
    this.adminservices.addspecs({obj:spvalue, filter: this.name}).subscribe(res=>{
      if(res.done) {
        this.spdone = true;
        setTimeout(()=>{this.spdone=false},3000);
       }
      });
    }
  }
}
