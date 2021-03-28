import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { IUserLogged } from '../models/user';
import { configurations } from '../config/configurations';
const { currentUrl } = configurations;

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  private token: string = localStorage.getItem('token');
  private tokenPayload = decode(this.token);
  private currentUrl = currentUrl;

  constructor(private router: Router, private http: HttpClient) { }

  canActivate(): Observable<boolean> | boolean {
    this.collectUser().subscribe({
      next: user => {
        if (!user['user']['isAdmin']) {
          this.router.navigate(['/login']);
          return false;
        }
      },
      error: err => console.error(err)
    })

    return true;
  }

  collectUser(): Observable<IUserLogged> {
    return this.http.post<IUserLogged>(`${this.currentUrl}/user/findById`, { id: this.tokenPayload['userId'] });
  }
}
