import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterPageService } from './registerPage.service';
import { IUserRegister } from 'src/app/shared/models/user';
import { IFeedbackMessage } from 'src/app/shared/models/feedbacks';

@Component({
  templateUrl: './registerPage.component.html',
  styleUrls: ['./registerPage.component.css']
})
export class RegisterPageComponent implements OnInit {
  typeInput: string = 'password';
  registerForm: FormGroup;
  hasEqualPassword: boolean = false;
  feedbackCreatedUser: IFeedbackMessage;

  constructor(private fb: FormBuilder, private registerPageService: RegisterPageService) { }

  ngOnInit(): void {
    this.handleFillingRegisterForm();
  }

  handleFillingRegisterForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(12), Validators.pattern(/^(?=.*?[a-zA-Zà-úÀ-Ú]).{1,12}$/i)]],
      email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/i)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/i)]]
    })
  }

  handleInputPassword(): void {
    this.typeInput === 'password' ? this.typeInput = 'text' : this.typeInput = 'password';
  }

  handleEqualPasswords(): boolean {
    if (this.registerForm.value.password != this.registerForm.value.confirmPassword) {
      this.hasEqualPassword = true;
      return true;
    } else {
      this.hasEqualPassword = false;
      return false;
    }
  }

  insertUser(user: IUserRegister): void {
    this.registerPageService.insertUser(user).subscribe({
      next: response => {
        this.feedbackCreatedUser = {
          message: response['message'],
          sucessful: true,
          invisible: false
        };

        this.registerForm.setValue({
          name: [''],
          email: [''],
          password: [''],
          confirmPassword: ['']
        });

        this.handleInvisibleFeedbackCreatedUser();
      },
      error: err => {
        this.feedbackCreatedUser = {
          message: err['error']['message'],
          sucessful: false,
          invisible: false
        };

        this.handleInvisibleFeedbackCreatedUser();
      }
    });
  }

  handleInvisibleFeedbackCreatedUser(): void {
    setTimeout(() => {
      this.feedbackCreatedUser = {
        message: null,
        sucessful: false,
        invisible: true
      };
    }, 2 * 1000)
  }

  onSubmit(): void {
    if (this.handleEqualPasswords()) {
      this.hasEqualPassword = false;

      setTimeout(() => {
        this.hasEqualPassword = true;
      }, 500);

      return;
    };

    this.insertUser(this.registerForm.value);
  }
}