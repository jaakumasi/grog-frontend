import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconBtnComponent } from '../icon-btn/icon-btn.component';

@Component({
  selector: 'app-outline-btn',
  standalone: true,
  imports: [IconBtnComponent],
  templateUrl: './outline-btn.component.html',
})
export class OutlineBtnComponent {
  @Input() label!: string;
  @Input() iconPath!: string;
  @Output() emitter = new EventEmitter<null>();
}
