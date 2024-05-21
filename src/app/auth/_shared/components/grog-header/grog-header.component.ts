import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grog-header',
  standalone: true,
  imports: [],
  templateUrl: './grog-header.component.html',
  styleUrl: './grog-header.component.scss',
})
export class GrogHeaderComponent {
  @Input() isSmall = false;
  
}
