import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private authUser: string = localStorage.getItem('auth');
  private token: string = localStorage.getItem('token');

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    if (!this.authUser || this.jwtHelper.isTokenExpired(this.token)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
