import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { configurations } from '../../shared/config/configurations';
import { Observable } from 'rxjs';
import { IUserLogged } from 'src/app/shared/models/user';
const { currentUrl } = configurations;

@Injectable({
    providedIn: 'root'
})
export class AdminUpdateUserPageService {
    private currentUrl = currentUrl;
    private headers;
    private token = localStorage.getItem('token');

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders().append('Content-Type', 'application/json')
            .append('authorization', this.token);
    }

    findUserById(id: string): Observable<IUserLogged> {
        return this.http.post<IUserLogged>(`${this.currentUrl}/user/findById`, { id });
    }

    updateTheUser(user: object): Observable<string> {
        return this.http.post<string>(`${this.currentUrl}/admin/updateTheUser`, user, {
            headers: this.headers
        })
    }
}