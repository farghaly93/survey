import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../adminServices.servise';
import { Router } from '@angular/router';
import { LoginServices } from './login-services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginServices: LoginServices) { }
  loading = false;
  mess: string;
  ngOnInit() {
  }
  login(pass) {
    this.loading = true;
    this.loginServices.login(pass.value);
  }

}
