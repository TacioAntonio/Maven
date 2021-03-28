import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import decode from 'jwt-decode';
import { ProfilePageService } from './profilePage.service';
import { IUserProfile } from 'src/app/shared/models/user';
import { IFeedbackMessage } from 'src/app/shared/models/feedbacks';

@Component({
    templateUrl: './profilePage.component.html',
    styleUrls: ['./profilePage.component.css']
})
export class ProfilePageComponent implements OnInit {
    avatars: number[] = Array.from({ length: 6 }, (_, k) => k + 1);
    avatarsPath: string[] = this.avatars.map(e => `../../../assets/users/${e}.png`);
    token: string = localStorage.getItem('token');
    tokenPayload = decode(this.token);
    imagePath: string;
    profileForm: FormGroup;
    tooglePasswordBox: boolean = false;
    feedbackProfile: IFeedbackMessage;

    constructor(private fb: FormBuilder, private profilePageService: ProfilePageService) { }

    ngOnInit(): void {
        this.findByIdUser();
    }

    findByIdUser(): void {
        this.profilePageService.findByIdUser(this.tokenPayload['userId']).subscribe({
            next: user => {
                this.imagePath = user['user']['imagePath'];

                this.profileForm = this.fb.group({
                    name: [user['user']['name'], [Validators.required, Validators.minLength(1), Validators.maxLength(12), Validators.pattern(/^(?=.*?[a-zA-Zà-úÀ-Ú]).{1,12}$/i)]],
                    email: [user['user']['email'], [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)]],
                    imagePath: [user['user']['imagePath'], Validators.required],
                    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/i)]]
                });
            },
            error: err => console.error(err)
        })
    }

    setAvatar(imagePath: string): void {
        const { name, email, password } = this.profileForm.value;

        this.imagePath = imagePath;

        this.profileForm.setValue({
            name,
            email,
            imagePath: imagePath,
            password
        });
    }

    handleTooglePasswordBox(): void {
        this.tooglePasswordBox = !this.tooglePasswordBox;
    }

    updateUser(user: IUserProfile): void {
        this.profilePageService.updateUser(user).subscribe({
            next: response => {
                this.feedbackProfile = {
                    message: response['message'],
                    sucessful: true,
                    invisible: false
                };


                this.handlePasswordBoxForm();
                this.handleInvisibleFeedbackProfile();
            },
            error: err => {
                this.feedbackProfile = {
                    message: err['error']['message'],
                    sucessful: false,
                    invisible: false
                };

                this.handlePasswordBoxForm();
                this.handleInvisibleFeedbackProfile();
            }
        });
    }

    handleInvisibleFeedbackProfile(): void {
        setTimeout(() => {
            this.feedbackProfile = {
                message: null,
                sucessful: false,
                invisible: true
            };
        }, 2 * 1000);
    }

    handlePasswordBoxForm(): void {
        const { imagePath, name, email } = this.profileForm.value;

        this.profileForm.setValue({
            imagePath,
            name,
            email,
            password: ''
        });
    }

    onSubmit(): void {
        this.handleTooglePasswordBox();

        const user = {
            userId: this.tokenPayload['userId'],
            ...this.profileForm.value
        }

        this.updateUser(user);
    }
}