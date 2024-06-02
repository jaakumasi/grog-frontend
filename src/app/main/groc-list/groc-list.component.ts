import { Component } from '@angular/core';
import { ContentBoxComponent } from '../_shared/components/content-box/content-box.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-groc-list',
  standalone: true,
  imports: [ContentBoxComponent, NgStyle],
  templateUrl: './groc-list.component.html',
  styleUrl: './groc-list.component.scss'
})
export class GrocListComponent {

}
