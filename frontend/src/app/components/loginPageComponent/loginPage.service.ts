import { Injectable } from "@angular/core";
import { configurations } from '../../shared/config/configurations';
import { HttpClient } from '@angular/common/http';
import { IUserLogin } from 'src/app/shared/models/user';
import { Observable } from 'rxjs';
const { currentUrl } = configurations;

@Injectable({
    providedIn: 'root'
})
export class LoginPageService {
    private currentUrl = currentUrl;

    constructor(private http: HttpClient) { }

    login(user: IUserLogin): Observable<object> {
        return this.http.post<object>(`${this.currentUrl}/login`, user);
    }
}