import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configurations } from '../../shared/config/configurations';
const { currentUrl } = configurations;
import { IUserLogged, IUserProfile } from 'src/app/shared/models/user';

@Injectable({
    providedIn: 'root'
})
export class ProfilePageService {
    private currentUrl = currentUrl;
    private token = localStorage.getItem('token');
    private headers;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders().append('Content-Type', 'application/json')
            .append('authorization', this.token);
    }

    findByIdUser(id: object): Observable<IUserLogged> {
        return this.http.post<IUserLogged>(`${this.currentUrl}/user/findById`, { id });
    }

    updateUser(user: IUserProfile): Observable<IUserProfile> {
        return this.http.post<IUserProfile>(`${this.currentUrl}/user/update`, user, {
            headers: this.headers
        });
    }
}