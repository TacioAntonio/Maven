import { Injectable } from "@angular/core";
import { configurations } from '../../shared/config/configurations';
const { currentUrl } = configurations;
import { HttpClient } from '@angular/common/http';
import { IUserRecover } from 'src/app/shared/models/user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecoverPasswordPageService {
    private currentUrl = currentUrl;

    constructor(private http: HttpClient) { }

    recoverUser(user: IUserRecover): Observable<object> {
        return this.http.post<object>(`${this.currentUrl}/user/recover`, user);
    }
}