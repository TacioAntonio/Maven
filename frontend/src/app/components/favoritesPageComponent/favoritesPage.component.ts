import { Component, OnInit } from "@angular/core";
import { FavoritesPageService } from "./favoritesPage.service";
import decode from 'jwt-decode';
import { IMidia } from "src/app/shared/models/midia";

@Component({
  templateUrl: 'favoritesPage.component.html',
  styleUrls: ['favoritesPage.component.css']
})
export class FavoritesPageComponent implements OnInit {
  token: string = localStorage.getItem('token');
  tokenPayload = decode(this.token);
  midiaIds: string[];
  favoriteMidias: IMidia | [] = [];

  constructor(private favoritesPageService: FavoritesPageService) { }

  ngOnInit(): void {
    this.findByIdUser();
  }

  findByIdUser(): void {
    this.favoritesPageService.findByIdUser(this.tokenPayload['userId']).subscribe({
      next: response => {
        this.midiaIds = response['user']['midiaIds'];
        this.collectFavoriteMidias();
      },
      error: err => console.error(err)
    });
  }

  collectFavoriteMidias(): void {
    this.favoritesPageService.collectFavoriteMidias(this.midiaIds).subscribe({
      next: favoriteMidias => {
        this.favoriteMidias = favoriteMidias;
      },
      error: err => console.error(err)
    });
  }
}
