import { Component } from '@angular/core';
import { GrogHeaderComponent } from '../_shared/components/grog-header/grog-header.component';
import { MessageBoxComponent } from '../../_shared/components/message-box/message-box.component';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [GrogHeaderComponent, MessageBoxComponent],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {

}
