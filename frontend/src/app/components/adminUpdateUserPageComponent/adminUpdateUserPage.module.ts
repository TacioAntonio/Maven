import { NgModule } from "@angular/core";
import { AdminUpdateUserPageComponent } from './adminUpdateUserPage.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AuthAdminGuard } from 'src/app/shared/guards/authAdmin.guard';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from "src/app/core/core.module";
import { FeedbackMessageModule } from 'src/app/shared/components/feedbackMessage/feedbackMessage.module';

@NgModule({
  declarations: [
    AdminUpdateUserPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    FeedbackMessageModule,
    RouterModule.forChild([
      {
        path: 'admin/updateTheUser/:id',
        component: AdminUpdateUserPageComponent,
        canActivate: [AuthGuard, AuthAdminGuard]
      }
    ])
  ]
})
export class AdminUpdateUserPageModule { }
