import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-action-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-btn.component.html',
  styleUrl: './action-btn.component.scss',
})
export class ActionBtnComponent implements OnChanges {
  @Input() btnText = '';
  @Input() isEnabled = false;
  @Input() isLoading!: boolean;
  @Output() clickEventEmitter = new EventEmitter<null>();

  onClick() {
    if (this.isEnabled) this.clickEventEmitter.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
}
