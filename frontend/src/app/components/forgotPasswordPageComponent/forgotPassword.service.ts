import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { configurations } from '../../shared/config/configurations';
import { Observable } from 'rxjs';
const { currentUrl } = configurations;

@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordService {
    private currentUrl = currentUrl;

    constructor(private http: HttpClient) { }

    sendEmailByRecoverPassword(email: object): Observable<object> {
        return this.http.post<object>(`${this.currentUrl}/recover`, email);
    }
}