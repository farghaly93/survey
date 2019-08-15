import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginServices } from './login-services';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private login: LoginServices) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token =  this.login.getToken();
      const request = req.clone({
        headers: req.headers.set('Authorization', 'bearer '+token)
      });
      return next.handle(request);
    }
  }
