import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Url } from 'url';

@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.css']
})
export class AdminsidebarComponent implements OnInit {

  constructor(private router: Router) { }
  params = [];
  ngOnInit() {
    const url = this.router.url;
    this.params = url.split('/');
  }
  logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('expDate');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  navigate(rout) {
    this.router.navigate([rout]);
  }
  activated(param, ob) {
    if(this.params.includes(param)) {
      if(ob==='color') {
        return '#000';
      }else if(ob==='back') {
        return '#f8f9fa';
      }
    }
  }
}

