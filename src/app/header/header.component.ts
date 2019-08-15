import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClientServices } from '../clientServices.servise';
import { Subject } from 'rxjs';
import { AdminServices } from '../admin/adminServices.servise';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private clientServices: ClientServices, private adminServices: AdminServices, private router: Router, private rout: ActivatedRoute) { }
  login = true;
  lng: string;
  lngul = false;
  cats = [];

  ngOnInit() {
    
    this.adminServices.getCategories().subscribe(res => {
      this.cats = res.cats;
      console.log(this.cats);
    });
    this.lng = localStorage.getItem('lang');
    this.clientServices.getlangSub().subscribe(res=>{
      this.lng = res.lang;
      localStorage.setItem('lang', res.lang);
    })
}
changelang(lng) {
  this.clientServices.setlang(lng);
  this.lng = lng;
  localStorage.setItem('lang', lng);
  }
  langul() {
    this.lngul = !this.lngul;
  }
  navigate(cat) {
    this.router.navigate([cat]);
  }
  catactive(cat) {
     const catparam = this.rout.snapshot.params.cat;
      if(catparam) {
        
        if(catparam === cat) {
          return 'catactive';
        }else {
          return '';
        }
      }
  }
}
