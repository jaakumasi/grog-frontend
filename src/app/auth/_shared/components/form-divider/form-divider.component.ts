import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-divider.component.html',
  styleUrl: './form-divider.component.scss'
})
export class FormDividerComponent {
  @Input() isVertical = false;
}
