import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../adminServices.servise';
import { ActivatedRoute, ParamMap, Router, RouterState } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { mimeType } from './mimetype.validator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})
export class AddStoreComponent implements OnInit {

  constructor(private adminServices: AdminServices, private route: ActivatedRoute, private router: Router) {}
  category: string;
  stores;
  form: FormGroup;
  imgPreview: any;
  mess;
  loading: boolean = false;
  name;
  desc;
  image;
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null , { validators: [Validators.required]} ),
      desc: new FormControl(null , { validators: [Validators.required]} ),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] }),
    });
    const state: RouterState = this.router.routerState;
    const root: ActivatedRoute = state.root;
    const child = root.firstChild;
    //const id: Observable<string> = child.params.map(p => p.id);
    console.log(child);

    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.category = params.get('cat');
      this.name = params.get('name');
      if(params.has('name')) {
        this.adminServices.getStore(this.name, this.category).subscribe(res=>{
          if(res.store){this.desc = res.store.desc;}
          if(res.store){this.image = res.store.image;}
          this.form.setValue({
            name: this.name,
            desc: this.desc || '',
            image: this.image || ''
          });
        });
      }
    });
  }
  addstore() {
    let body;
    if(this.form.valid) {
      if(this.name) {
         body = {name: this.name, category: this.category,desc: this.form.get('desc').value, image: this.form.get('image').value};
      }else {
         body = {category: this.category,name: this.form.get('name').value, desc: this.form.get('desc').value, image: this.form.get('image').value};
      }
      this.loading = true;
      for(let b in body) {
        if(typeof body[b]==='string'){
          body[b] = body[b].toLowerCase();
        }
      }
      this.adminServices.addStore(body).subscribe(res=>{
        this.mess = res.mess;
        this.loading = false;
        this.router.navigate["back"];
        if(!this.name){
          this.form.reset();
          this.imgPreview = null; 
        }
      });
    }
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
}
