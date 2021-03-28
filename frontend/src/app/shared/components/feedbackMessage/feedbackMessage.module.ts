import { NgModule } from "@angular/core";
import { FeedbackMessageComponent } from "./feedbackMessage.component";
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FeedbackMessageComponent
  ],
  exports: [
    FeedbackMessageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeedbackMessageModule { }
