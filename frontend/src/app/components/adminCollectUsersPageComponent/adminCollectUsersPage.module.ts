import { NgModule } from "@angular/core";
import { AdminCollectUsersPageComponent } from "./adminCollectUsersPage.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthAdminGuard } from 'src/app/shared/guards/authAdmin.guard';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  declarations: [
    AdminCollectUsersPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: 'admin/collectUsers',
        component: AdminCollectUsersPageComponent,
        canActivate: [AuthGuard, AuthAdminGuard]
      }
    ])
  ]
})
export class AdminCollectUsersPageModule { }
