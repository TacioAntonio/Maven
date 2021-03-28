import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { configurations } from '../../shared/config/configurations';
import { Observable } from 'rxjs';
import { IMidia } from 'src/app/shared/models/midia';
const { currentUrl } = configurations;

@Injectable({
    providedIn: 'root'
})
export class AdminUpdateMidiaPageService {
    private currentUrl = currentUrl;
    private token = localStorage.getItem('token');
    private headers;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders().append('Content-Type', 'application/json')
            .append('authorization', this.token);
    }

    findByIdMidia(id: string): Observable<IMidia> {
        return this.http.post<IMidia>(`${this.currentUrl}/midia/findById`, { id });
    }

    updateMidia(midia: IMidia): Observable<object> {
        return this.http.post<object>(`${this.currentUrl}/admin/updateMidia`, midia, {
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