import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageModule } from './components/homePageComponent/homePage.module';
import { LoginPageModule } from './components/loginPageComponent/loginPage.module';
import { RegisterPageModule } from './components/registerPageComponent/registerPage.module';
import { MainPageModule } from './components/mainPageComponent/mainPage.module';
import { ProfilePageModule } from './components/profilePageComponent/profilePage.module';
import { ForgotPasswordModule } from './components/forgotPasswordPageComponent/forgotPassword.module';
import { RecoverPasswordPageModule } from './components/recoverPasswordPageComponent/recoverPasswordPage.module';
import { FavoritesPageModule } from './components/favoritesPageComponent/favoritesPage.module';

import { AdminCollectUsersPageModule } from './components/adminCollectUsersPageComponent/adminCollectUsersPage.module';
import { AdminUpdateUserPageModule } from './components/adminUpdateUserPageComponent/adminUpdateUserPage.module';
import { AdminInsertMidiaPageModule } from './components/adminInsertMidiaPageComponent/adminInsertMidiaPage.module';
import { AdminUpdateMidiaPageModule } from './components/adminUpdateMidiaPageComponent/adminUpdateMidiaPage.module';
import { Error404Component } from './core/components/error404/error404.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { AuthAdminGuard } from './shared/guards/authAdmin.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomePageModule,
    LoginPageModule,
    RegisterPageModule,
    MainPageModule,
    ProfilePageModule,
    ForgotPasswordModule,
    RecoverPasswordPageModule,
    FavoritesPageModule,
    AdminCollectUsersPageModule,
    AdminUpdateUserPageModule,
    AdminInsertMidiaPageModule,
    AdminUpdateMidiaPageModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: Error404Component }
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthGuard, AuthAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
