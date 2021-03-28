import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { MainPageService } from './mainPage.service';
import { IUserLogged } from 'src/app/shared/models/user';
import { IMidia } from 'src/app/shared/models/midia';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './mainPage.component.html',
  styleUrls: ['./mainPage.component.css']
})
export class MainPageComponent implements OnInit {
  user: IUserLogged;
  authUser: string = localStorage.getItem('auth');
  token: string = localStorage.getItem('token');
  tokenPayload = decode(this.token);
  // Midia
  arrowBar: string = '../../../assets/images/arrow-up.svg';
  midias: IMidia[];
  virtualMidias: Set<IMidia> = new Set();
  filteredMidias: IMidia[];
  switchFilteredMidia: boolean = false;
  optionToFilteredMidiaForm: FormGroup;
  optionsToFiltration: string[] = this.handleLanguage();
  favoriteMidiaIds: string[];
  // DOM
  mainPlayer: Element;
  mainBar: Element;
  mainList: Element;
  mainBarOptions: Element;
  // Admin
  isInvisible: boolean;

  constructor(private route: Router, private fb: FormBuilder, private mainPageService: MainPageService) { }

  ngOnInit(): void {
    this.collectMidia();
    this.collectFavoriteMidias();
    this.handleOptionToFilteredMidiaForm();
    this.findByIdUser();
  }

  handleLanguage(): string[] {
    return localStorage.getItem('language') === 'en' ? ['Movies', 'Series'] : ['Filmes', 'Séries'];
  }

  addToFavoriteMidia(midiaId: string): void {
    this.mainPageService.addToFavorite(this.tokenPayload['userId'], midiaId).subscribe({
      next: _ => {
        this.collectFavoriteMidias();
      },
      error: err => console.error(err)
    })
  }

  removeToFavoriteMidia(midiaId: string): void {
    this.mainPageService.removeToFavorite(this.tokenPayload['userId'], midiaId).subscribe({
      next: _ => {
        this.virtualMidias = new Set();
        this.collectMidia();
        this.collectFavoriteMidias();
      },
      error: err => console.error(err)
    })
  }

  handleOptionToFilteredMidiaForm(): void {
    this.optionToFilteredMidiaForm = this.fb.group({
      optionsMidia: ['']
    });
  }

  changeArrow(): void {
    this.mainBar = document.querySelector('.mediaBar')['style'];
    this.mainList = document.querySelector('.mediaBar__list')['style'];
    this.mainBarOptions = document.querySelector('.mediaBar__group')['style'];

    const arrowStates = {
      up: '../../../assets/images/arrow-up.svg',
      down: '../../../assets/images/arrow-down.svg'
    }

    this.arrowBar = this.arrowBar === arrowStates.up ? arrowStates.down : arrowStates.up;

    if (this.arrowBar === arrowStates.up) {
      this.mainBar['top'] = '0';
      this.mainBar['height'] = '32px';
      this.mainList['display'] = 'none';
      this.mainBarOptions['display'] = 'none';
    } else {
      this.mainBar['top'] = '-265px';
      this.mainBar['height'] = '309px';
      this.mainList['display'] = 'flex';
      this.mainBarOptions['display'] = 'flex';
    }
  }

  findByIdUser(): void {
    this.mainPageService.findByIdUser(this.tokenPayload['userId']).subscribe({
      next: user => {
        this.user = user;
        this.isInvisible = user['user']['isAdmin'];
      },
      error: err => console.error(err)
    })
  }

  collectFavoriteMidias(): void {
    this.mainPageService.findByIdUser(this.tokenPayload['userId']).subscribe({
      next: response => {
        this.favoriteMidiaIds = response['user']['midiaIds'];

        if (this.midias) {
          this.midias.map(midia => {
            const { _id } = midia;

            for (const favoriteMidiaId of this.favoriteMidiaIds) {
              if (_id === favoriteMidiaId) {
                midia['isFavorite'] = true;

                this.virtualMidias.add(midia);
              }

              this.virtualMidias.add(midia);
            }

          });
        }

        if (this.virtualMidias.size > 0) {
          this.filteredMidias = <IMidia[]><any>this.virtualMidias;
        } else {
          this.filteredMidias = this.midias;
        }

        if (this.filteredMidias) {
          setTimeout(_ => {
            this.switchFilteredMidia = true;
            setTimeout(_ => {
              console.clear();
            }, 1000)
          }, 3 * 1000);
        }
      },
      error: err => console.error(err)
    })
  }

  collectMidia(): void {
    this.mainPageService.collectMidia().subscribe({
      next: midias => {
        this.midias = midias['midia'];
      },
      error: err => console.error(err)
    })
  }

  handleFilteredMidia(): void {
    const handleFiltrationMidia = (value: string | number): void => {
      const categoryMidia = {
        Filmes: 'Movies',
        Séries: 'Series',
        Movies: 'Movies',
        Series: 'Series'
      }

      if (this.virtualMidias.size) {
        this.filteredMidias = [...this.virtualMidias].filter(midia => midia['category'] === categoryMidia[value]);
      } else {
        this.filteredMidias = this.midias.filter(midia => midia['category'] === categoryMidia[value]);
      }
    }

    const { value } = this.optionToFilteredMidiaForm.controls.optionsMidia;

    if (value.length !== 0) {
      handleFiltrationMidia(value);
    }
  }

  handleSearchFilteredMidia(): void {
    const { value } = this.optionToFilteredMidiaForm.controls.optionsMidia;

    if (this.virtualMidias.size) {
      this.filteredMidias = [...this.virtualMidias].filter(midia => midia['name'].toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    } else {
      this.filteredMidias = this.midias.filter(midia => midia['name'].toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    }
  }

  handleMidiaPlayer(trailerUrl: string): void {
    this.mainPlayer = document.querySelector('.container__player');

    this.mainPlayer['src'] = `https://www.youtube.com/embed/${trailerUrl}`;

    setTimeout(_ => {
      console.clear();
    }, 2000);
  }

  updateMidia(id: string): void {
    this.route.navigate(['admin/updateMidia', id]);
  }

  deleteMidia(id: string): void {
    this.mainPageService.deleteMidia(id).subscribe({
      next: _ => {
        this.virtualMidias = new Set();
        this.collectMidia();
        this.collectFavoriteMidias();
      },
      error: err => console.error(err)
    });
  }

  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    window.location.reload();
  }
}
