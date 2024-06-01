import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './_shared/components/header/header.component';
import { MenuComponent } from './_shared/components/menu/menu.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
