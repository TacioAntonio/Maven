import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { configurations } from '../../shared/config/configurations';
const { currentUrl } = configurations;
import { Observable } from 'rxjs';
import { IUserLogged } from 'src/app/shared/models/user';


@Injectable({
    providedIn: 'root'
})
export class AdminCollectUsersPageService {
    private currentUrl = currentUrl;
    private token = localStorage.getItem('token');
    private headers;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders().append('Content-Type', 'application/json')
            .append('authorization', this.token);
    }

    collectUsers(): Observable<IUserLogged> {
        return this.http.get<IUserLogged>(`${this.currentUrl}/admin/collectUsers`, {
            headers: this.headers
        });
    }

    deleteUser(id: string): Observable<object> {
        return this.http.post<object>(`${this.currentUrl}/admin/deleteUser`, { id }, {
            headers: this.headers
        })
    }
}