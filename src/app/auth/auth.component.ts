import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GrogHeaderComponent } from './_shared/components/grog-header/grog-header.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [GrogHeaderComponent, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}
