import { Component, Input, input } from '@angular/core';
import { SocialLoginProvider } from '../../../../../../_shared/types';

@Component({
  selector: 'app-menu-contents',
  standalone: true,
  imports: [],
  templateUrl: './menu-contents.component.html',
})
export class MenuContentsComponent {
  @Input() email!: string;
  @Input() socialProvider: SocialLoginProvider | null = null;
}
