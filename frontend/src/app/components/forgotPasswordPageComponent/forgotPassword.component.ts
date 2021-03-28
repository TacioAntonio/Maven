import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from './forgotPassword.service';
import { IFeedbackMessage } from 'src/app/shared/models/feedbacks';

@Component({
    templateUrl: './forgotPassword.component.html',
    styleUrls: ['./forgotPassword.component.css']
})
export class ForgotPasswordPageComponent implements OnInit {
    forgotForm: FormGroup;
    feedbackForgot: IFeedbackMessage;

    constructor(private fb: FormBuilder, private forgotPasswordService: ForgotPasswordService) { }

    ngOnInit(): void {
        this.handleForgotForm();
    }

    handleForgotForm(): void {
        this.forgotForm = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)]]
        });
    }

    sendEmailByRecoverPassword(email: object): void {
        this.forgotPasswordService.sendEmailByRecoverPassword(email).subscribe({
            next: response => {
                this.feedbackForgot = {
                    message: response['message'],
                    sucessful: true,
                    invisible: false
                };

                this.handleInvisibleFeedbackForgot();
            },
            error: ({ error }) => {
                this.feedbackForgot = {
                    message: error['message'],
                    sucessful: false,
                    invisible: false
                };

                this.handleInvisibleFeedbackForgot();
            }
        });
    }

    handleInvisibleFeedbackForgot(): void {
        setTimeout(() => {
            this.feedbackForgot = {
                message: null,
                sucessful: false,
                invisible: true
            };
        }, 2 * 1000);
    }

    onSubmit(): void {
        this.sendEmailByRecoverPassword(this.forgotForm.value);
    }
}