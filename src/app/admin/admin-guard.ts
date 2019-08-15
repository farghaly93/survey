import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminServices } from './adminServices.servise';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private adminServices: AdminServices, private router: Router) {}
  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
      ): boolean | Observable<boolean>|Promise<boolean> {
        if (localStorage.getItem('auth') !== "authenticated") {
          this.router.navigate(['/login']);
        }
        return true;
      }
}
