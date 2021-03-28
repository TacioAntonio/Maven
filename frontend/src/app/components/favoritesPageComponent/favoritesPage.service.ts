import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { configurations } from '../../shared/config/configurations';
const { currentUrl } = configurations;
import { IUserLogged } from 'src/app/shared/models/user';
import { IMidia } from "src/app/shared/models/midia";

@Injectable({
  providedIn: 'root'
})
export class FavoritesPageService {
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

  collectFavoriteMidias(midiaIds: string[]): Observable<IMidia> {
    return this.http.post<IMidia>(`${this.currentUrl}/user/collectFavoriteMidias`, { midiaIds }, {
      headers: this.headers
    });
  }
}
