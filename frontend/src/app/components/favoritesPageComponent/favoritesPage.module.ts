import { NgModule } from "@angular/core";
import { FavoritesPageComponent } from './favoritesPage.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { CoreModule } from "src/app/core/core.module";
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    FavoritesPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([{
      path: 'favorites',
      component: FavoritesPageComponent,
      canActivate: [AuthGuard] // Necessita de login para acessar
    }]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class FavoritesPageModule { }
