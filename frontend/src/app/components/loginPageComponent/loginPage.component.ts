import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPageService } from './loginPage.service';
import { IUserLogin } from 'src/app/shared/models/user';
import { Router } from "@angular/router";
import { IFeedbackMessage } from "src/app/shared/models/feedbacks";
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  templateUrl: './loginPage.component.html',
  styleUrls: ['./loginPage.component.css']
})
export class LoginPageComponent implements OnInit {
  typeInput: string = 'password';
  tooglePassword: string = '../../../assets/images/eye-hidden.svg';
  loginForm: FormGroup;
  feedbackLogin: IFeedbackMessage;
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private authUser: string = localStorage.getItem('auth');
  private token: string = localStorage.getItem('token');

  constructor(private router: Router, private fb: FormBuilder, private loginPageService: LoginPageService) { }

  ngOnInit(): void {
    this.handleFillingLoginForm();
    this.checkAuthentication();
  }

  handleFillingLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/i)]]
    });
  }

  checkAuthentication(): void {
    if (this.authUser || !this.jwtHelper.isTokenExpired(this.token)) {
      this.router.navigate(['/main']);
    }
  }

  handleInputPassword(): void {
    this.typeInput === 'password' ? this.typeInput = 'text' : this.typeInput = 'password';
    this.handleTooglePassword();
  }

  handleTooglePassword(): void {
    const viewsPassword = {
      show: '../../../assets/images/eye-show.svg',
      hidden: '../../../assets/images/eye-hidden.svg'
    }

    this.tooglePassword === viewsPassword.hidden ?
      this.tooglePassword = viewsPassword.show :
      this.tooglePassword = viewsPassword.hidden;
  }

  handleLogin(user: IUserLogin): void {
    this.loginPageService.login(user).subscribe({
      next: response => {
        localStorage.setItem('auth', response['auth']);
        localStorage.setItem('token', response['token']);

        window.location.reload();
      },
      error: err => {
        this.feedbackLogin = {
          message: err['error']['message'],
          sucessful: false,
          invisible: false
        };

        this.handleInvisibleFeedbackLogin();
      }
    });
  }

  handleInvisibleFeedbackLogin(): void {
    setTimeout(() => {
      this.feedbackLogin = {
        message: null,
        sucessful: false,
        invisible: true
      };
    }, 2 * 1000);
  }

  onSubmit(): void {
    this.handleLogin(this.loginForm.value);
  }
}