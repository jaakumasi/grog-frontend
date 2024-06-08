import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentBoxComponent } from '../_shared/components/content-box/content-box.component';

@Component({
  selector: 'app-groc-list',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './groc-list.component.html',
})
export class GrocListComponent {}
