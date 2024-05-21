import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invalid-input-message',
  standalone: true,
  imports: [],
  templateUrl: './invalid-input-message.component.html',
})
export class InvalidInputMessageComponent {
  @Input() message = '';
}
