import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { RouterState, ActivatedRoute, ParamMap, Router } from '@angular/router';
import { mimeType } from '../add-store/mimetype.validator';
import { AdminServices } from '../adminServices.servise';

@Component({
  selector: 'app-ads',
  templateUrl: './addAd.component.html',
  styleUrls: ['./addAd.component.css']
})
export class addAdComponent implements OnInit {
  constructor(private adminServices: AdminServices, private route: ActivatedRoute, private router: Router) {}
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

    this.route.paramMap.subscribe((params: ParamMap)=>{
      if(params.has('name')) {
        this.name = params.get('name');
        this.adminServices.getAd(this.name).subscribe(res=>{
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
  addAd() {
    let body;
    if(this.form.valid) {
      if(this.name) {
         body = {name: this.name, desc: this.form.get('desc').value, image: this.form.get('image').value};
      }else {
         body = {name: this.form.get('name').value, desc: this.form.get('desc').value, image: this.form.get('image').value};
      }
      this.loading = true;
      for(let b in body) {
        if(typeof body[b]==='string'){
          body[b] = body[b].toLowerCase();
        }
      }
      this.adminServices.addAd(body).subscribe(res=>{
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
