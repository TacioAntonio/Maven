import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LogoComponent } from "./logo.component";

@NgModule({
  declarations: [
    LogoComponent
  ],
  exports: [
    LogoComponent
  ],
  imports: [
    RouterModule
  ]
})
export class LogoModule { }
