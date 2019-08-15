import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class LoginServices {
    constructor(private http: HttpClient, private router: Router) {}
    private token: any;
    expTime: any;
    login(pass) {
        // console.log(pass);
         this.http.post<{isAdmin, token, expDate: number}>('http://localhost:3000/admin/login', {pass}).subscribe(res => {
            if (res.isAdmin && res.token) {
              this.token = res.token;
              this.expTime = res.expDate;
              const expDate = new Date(new Date().getTime() + res.expDate * 1000);
              localStorage.setItem('auth', 'authenticated');
              localStorage.setItem('expDate', expDate.toISOString());
              console.log( this.expTime);
              localStorage.setItem('token', res.token);
              this.setTime();
             // this.mess = "logged successfully...";
              this.router.navigate(['admin/dashboard']);
            } else {
            // this.mess = 'Wrong password...';
            }
            // this.loading = false;
          });
        }
        setTime() {
            setTimeout(() => {
                localStorage.removeItem('auth');
                localStorage.removeItem('expDate');
                localStorage.removeItem('token');
                this.router.navigate(['login']);
              }, this.expTime * 1000);
        }
        getToken() {
            const now = new Date().getTime();
            const expTime = new Date(localStorage.getItem('expDate')).getTime();
            const remain = expTime - now;
            this.expTime = remain;
            if (remain < 0) {
                localStorage.removeItem('auth');
                localStorage.removeItem('expDate');
                localStorage.removeItem('token');
                return;

            } else {
                this.expTime = remain / 1000;
                this.setTime();
                // console.log(remain);

                this.token = localStorage.getItem('token');
                return this.token;
            }
        }
    }

