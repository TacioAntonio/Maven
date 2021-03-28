import { NgModule } from "@angular/core";
import { AdminUpdateMidiaPageComponent } from './adminUpdateMidiaPage.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AuthAdminGuard } from 'src/app/shared/guards/authAdmin.guard';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  declarations: [
    AdminUpdateMidiaPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: 'admin/updateMidia/:id',
        component: AdminUpdateMidiaPageComponent,
        canActivate: [AuthGuard, AuthAdminGuard]
      }
    ])
  ]
})
export class AdminUpdateMidiaPageModule { }
