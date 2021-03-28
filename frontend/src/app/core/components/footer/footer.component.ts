import { Component, OnInit } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    private language: string = localStorage.getItem('language') || this.translate.getBrowserLang();

    constructor(public translate: TranslateService) { }

    ngOnInit(): void {
        this.translate.addLangs(['en', 'pt']);
        this.translate.use(this.language);
    }

    handleTitle(language: string) {
        if (language === 'en') {
            window.document.title = 'Maven - Watch movies and series online';
        } else {
            window.document.title = 'Maven - Assista a filmes e séries online';
        }
    }

    handleLanguageStorage(language: string) {
        this.handleTitle(language);
        localStorage.setItem('language', language);
    }

}