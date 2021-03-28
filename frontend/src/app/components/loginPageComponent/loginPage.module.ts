import { NgModule } from "@angular/core";
import { LoginPageComponent } from './loginPage.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LogoModule } from "src/app/shared/components/logo/logo.module";
import { FeedbackMessageModule } from 'src/app/shared/components/feedbackMessage/feedbackMessage.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    LogoModule,
    FeedbackMessageModule,
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent }
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
export class LoginPageModule { }
