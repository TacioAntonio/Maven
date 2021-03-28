import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configurations } from '../../shared/config/configurations';
const { currentUrl } = configurations;
import { IUserLogged } from 'src/app/shared/models/user';
import { IMidia } from 'src/app/shared/models/midia';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {
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

  collectMidia(): Observable<IMidia[]> {
    return this.http.get<IMidia[]>(`${this.currentUrl}/midia/collect`);
  }

  addToFavorite(userId: string, midiaId: string): Observable<object> {
    return this.http.post<object>(`${this.currentUrl}/user/insertBookmark`, { userId, midiaId }, {
      headers: this.headers
    });
  }

  removeToFavorite(userId: string, midiaId: string): Observable<object> {
    return this.http.post<object>(`${this.currentUrl}/user/removeFavoriteMidia`, { userId, midiaId }, {
      headers: this.headers
    });
  }

  collectFavoriteMidias(midiaIds: string[]): Observable<IMidia> {
    return this.http.post<IMidia>(`${this.currentUrl}/user/collectFavoriteMidias`, { midiaIds }, {
      headers: this.headers
    });
  }

  deleteMidia(id: string): Observable<object> {
    return this.http.post<object>(`${this.currentUrl}/admin/deleteMidia`, { id }, {
      headers: this.headers
    })
  }
}
