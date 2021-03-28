import { NgModule } from "@angular/core";
import { AdminInsertMidiaPageComponent } from './adminInsertMidiaPage.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AuthAdminGuard } from 'src/app/shared/guards/authAdmin.guard';
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  declarations: [
    AdminInsertMidiaPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: 'admin/insertMida',
        component: AdminInsertMidiaPageComponent,
        canActivate: [AuthGuard, AuthAdminGuard]
      }
    ])
  ]
})
export class AdminInsertMidiaPageModule { }
