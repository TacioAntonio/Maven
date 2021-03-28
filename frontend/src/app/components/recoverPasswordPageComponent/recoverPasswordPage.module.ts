import { NgModule } from "@angular/core";
import { RecoverPasswordPageComponent } from './recoverPasswordPage.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LogoModule } from 'src/app/shared/components/logo/logo.module';
import { FeedbackMessageModule } from 'src/app/shared/components/feedbackMessage/feedbackMessage.module';

@NgModule({
    declarations: [
        RecoverPasswordPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LogoModule,
        FeedbackMessageModule,
        RouterModule.forChild([
            { path: 'recover/:token', component: RecoverPasswordPageComponent }
        ])
    ]
})
export class RecoverPasswordPageModule { }