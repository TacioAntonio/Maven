import { Component, Input } from "@angular/core";
import { IFeedbackMessage } from '../../models/feedbacks';

@Component({
  selector: 'app-feedbackMessage',
  templateUrl: 'feedbackMessage.component.html',
  styleUrls: ['feedbackMessage.component.css']
})
export class FeedbackMessageComponent {
  @Input() feedbackMessage: IFeedbackMessage;
}
