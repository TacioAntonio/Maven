import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminUpdateUserPageService } from './adminUpdateUserPage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFeedbackMessage } from 'src/app/shared/models/feedbacks';

@Component({
    templateUrl: 'adminUpdateUserPage.component.html',
    styleUrls: ['adminUpdateUserPage.component.css']
})
export class AdminUpdateUserPageComponent implements OnInit {
    userId: string;
    userForm: FormGroup;
    name: string;
    imagePath: string;
    feedbackUpdateUser: IFeedbackMessage;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private adminUpdateUserPageService: AdminUpdateUserPageService) {
        this.route.params.subscribe(params => {
            this.userId = params['id'];
        });
    }

    ngOnInit(): void {
        this.findUserById();
    }

    findUserById(): void {
        this.adminUpdateUserPageService.findUserById(this.userId).subscribe({
            next: dataUser => {
                this.name = dataUser['user']['name'];
                this.imagePath = dataUser['user']['imagePath'];

                this.userForm = this.fb.group({
                    name: [dataUser['user']['name'], [Validators.required, Validators.minLength(1), Validators.maxLength(12), Validators.pattern(/^(?=.*?[a-zA-Zà-úÀ-Ú]).{1,12}$/i)]],
                    email: [dataUser['user']['email'], [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)]],
                    isAdmin: [dataUser['user']['isAdmin']],
                })
            },
            error: err => console.error(err)
        });
    }

    updateUser(user: object): void {
        this.adminUpdateUserPageService.updateTheUser(user).subscribe({
            next: response => {
                console.log(response)
                this.findUserById();

                this.feedbackUpdateUser = {
                    message: response['message'],
                    sucessful: true,
                    invisible: false,
                };

                this.handleInvisibleFeedbackCreatedUser();
            },
            error: err => {
                console.log(err)

                this.feedbackUpdateUser = {
                    message: err['error']['message'] || err['message'],
                    sucessful: false,
                    invisible: false,
                };

                this.handleInvisibleFeedbackCreatedUser();
            }
        });
    }

    handleInvisibleFeedbackCreatedUser(): void {
        setTimeout(() => {
            this.feedbackUpdateUser = {
                message: null,
                sucessful: false,
                invisible: true
            };
        }, 2 * 1000);
    }

    onSubmit(): void {
        const dataUser = {
            ...this.userForm.value,
            userId: this.userId
        }

        this.updateUser(dataUser);
    }
}