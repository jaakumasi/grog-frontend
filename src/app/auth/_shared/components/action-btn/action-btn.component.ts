import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-btn.component.html',
  styleUrl: './action-btn.component.scss',
})
export class ActionBtnComponent {
  @Input() btnText = '';
  @Input() isEnabled = false;
  @Output() clickEventEmitter = new EventEmitter<null>();

  onClick() {
    if (this.isEnabled) this.clickEventEmitter.emit();
  }
}
