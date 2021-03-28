import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { configurations } from '../../shared/config/configurations';
const { currentUrl } = configurations;
import { Observable } from 'rxjs';
import { IMidia } from 'src/app/shared/models/midia';

@Injectable({
    providedIn: 'root'
})
export class AdminInsertMidiaPageService {
    private currentUrl = currentUrl;
    private token = localStorage.getItem('token');
    private headers;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders().append('Content-Type', 'application/json')
            .append('authorization', this.token);
    }

    insertMidia(midia: IMidia): Observable<object> {
        return this.http.post<object>(`${this.currentUrl}/admin/insertMidia`, midia, {
            headers: this.headers
        });
    }

    uploadMovie(fd: FormData): Observable<object> {
        return this.http.post<object>(`${this.currentUrl}/movie/upload`, fd);
    }

    uploadSerie(fd: FormData): Observable<object> {
        return this.http.post<object>(`${this.currentUrl}/serie/upload`, fd);
    }
}