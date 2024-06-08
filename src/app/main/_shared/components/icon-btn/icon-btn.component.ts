import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-btn',
  standalone: true,
  imports: [],
  templateUrl: './icon-btn.component.html',
})
export class IconBtnComponent {
  @Input() iconPath!: string;
  @Input() routerLinkProp!: string;
  @Output() emitter = new EventEmitter<null>();
}
