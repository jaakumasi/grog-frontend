import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
})
export class MessageComponent {
  @Input() message = '';
  @Input() type!: 'log' | 'error'; 
}
