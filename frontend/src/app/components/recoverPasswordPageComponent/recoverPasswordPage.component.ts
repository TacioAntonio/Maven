import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import decode from 'jwt-decode';
import { IFeedbackMessage } from 'src/app/shared/models/feedbacks';
import { RecoverPasswordPageService } from './recoverPasswordPage.service';
import { IUserRecover } from 'src/app/shared/models/user';

@Component({
  templateUrl: './recoverPasswordPage.component.html',
  styleUrls: ['./recoverPasswordPage.component.css']
})
export class RecoverPasswordPageComponent implements OnInit {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  token: string;
  toogleTemplante: boolean = false || true;
  recoverPasswordForm: FormGroup;
  typeInput: string = 'password';
  tokenPayload: object;
  hasEqualPassword: boolean = false;
  feedbackRecover: IFeedbackMessage;
  userId: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private recoverPasswordPageService: RecoverPasswordPageService) { }

  ngOnInit(): void {
    this.handleRecoverForm();
    this.handleRouteToken();
    this.tokenPayload = decode(this.token);
    this.userId = this.tokenPayload['userId'];
    this.checkSession();
  }

  handleRecoverForm(): void {
    this.recoverPasswordForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(/\d/g)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/i)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/i)]]
    })
  }

  handleRouteToken(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  checkSession(): void {
    if (this.jwtHelper.isTokenExpired(this.token)) {
      this.toogleTemplante = false;
      return;
    }

    this.toogleTemplante = true;
  }

  handleEqualPasswords(): boolean {
    if (this.recoverPasswordForm.value.newPassword != this.recoverPasswordForm.value.confirmNewPassword) {
      this.hasEqualPassword = true;
      return true;
    } else {
      this.hasEqualPassword = false;
      return false;
    }
  }

  handleInputPassword(): void {
    this.typeInput === 'password' ? this.typeInput = 'text' : this.typeInput = 'password';
  }

  handleInvisibleFeedbackRecover(): void {
    setTimeout(() => {
      this.feedbackRecover = {
        message: null,
        sucessful: false,
        invisible: true
      };
    }, 2 * 1000);
  }

  handleEqualCodes(): boolean {
    if (this.recoverPasswordForm.value.code != this.tokenPayload['code']) {
      this.feedbackRecover = {
        message: 'The code is invalid.',
        sucessful: false,
        invisible: false
      };

      this.handleInvisibleFeedbackRecover();

      return true;
    }
  }

  recoverUser(user: IUserRecover): void {
    this.recoverPasswordPageService.recoverUser(user).subscribe({
      next: response => {

        this.feedbackRecover = {
          message: response['message'],
          sucessful: true,
          invisible: false
        };

        this.recoverPasswordForm.setValue({
          code: [''],
          newPassword: [''],
          confirmNewPassword: ['']
        });

        this.handleInvisibleFeedbackRecover();
      },
      error: err => {
        this.feedbackRecover = {
          message: err['error']['message'],
          sucessful: false,
          invisible: false
        };

        this.handleInvisibleFeedbackRecover();
      }
    });
  }

  onSubmit(): void {
    if (this.handleEqualPasswords()) {
      this.hasEqualPassword = false;

      setTimeout(() => {
        this.hasEqualPassword = true;
      }, 500);

      return;
    };

    if (this.handleEqualCodes()) { return; };

    const user = {
      id: this.userId,
      ...this.recoverPasswordForm.value
    }

    this.recoverUser(user);
  }
}
