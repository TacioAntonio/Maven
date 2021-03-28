import { Component, OnInit } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit {
  private language: string = localStorage.getItem('language') || this.translate.getBrowserLang();

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.handleTranslate();
  }

  handleTranslate(): void {
    this.translate.addLangs(['en', 'pt']);
    this.translate.use(this.language);
    this.handleLanguageStorage(this.language);
  }

  handleTitle(language: string): void {
    if (language === 'en') {
      window.document.title = 'Maven - Watch movies and series online';
    } else {
      window.document.title = 'Maven - Assista a filmes e séries online';
    }
  }

  handleLanguageStorage(language: string): void {
    this.handleTitle(language);
    localStorage.setItem('language', language);
  }
}
