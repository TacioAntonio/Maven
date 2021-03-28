import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './homePage.component';
import { CoreModule } from "src/app/core/core.module";
import { LogoModule } from "src/app/shared/components/logo/logo.module";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CoreModule,
    LogoModule,
    RouterModule.forChild([
      {
        path: 'home',
        component: HomePageComponent
      }
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class HomePageModule { }
