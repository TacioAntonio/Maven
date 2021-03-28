import { Component, Input } from "@angular/core";

// @Input link
@Component({
  selector: 'app-logo',
  templateUrl: 'logo.component.html',
  styleUrls: ['logo.component.css']
})
export class LogoComponent {
  @Input() link: string = '';
  @Input() target: string = '_self';
}
