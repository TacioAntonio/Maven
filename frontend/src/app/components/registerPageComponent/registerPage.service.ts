import { Injectable } from "@angular/core";
import { configurations } from '../../shared/config/configurations';
import { HttpClient } from '@angular/common/http';
import { IUserRegister } from 'src/app/shared/models/user';
import { Observable } from 'rxjs';
const { currentUrl } = configurations;

@Injectable({
    providedIn: 'root'
})
export class RegisterPageService {
    private currentUrl = currentUrl;

    constructor(private http: HttpClient) { }

    insertUser(user: IUserRegister): Observable<object> {
        return this.http.post<object>(`${this.currentUrl}/user/insert`, user);
    }
}