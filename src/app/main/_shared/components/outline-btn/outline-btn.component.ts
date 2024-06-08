import { Component, Input } from '@angular/core';
import { IconBtnComponent } from '../icon-btn/icon-btn.component';

@Component({
  selector: 'app-outline-btn',
  standalone: true,
  imports: [IconBtnComponent],
  templateUrl: './outline-btn.component.html',
  styleUrl: './outline-btn.component.scss'
})
export class OutlineBtnComponent {
  @Input() label!: string;
  @Input() iconPath!: string;
}
