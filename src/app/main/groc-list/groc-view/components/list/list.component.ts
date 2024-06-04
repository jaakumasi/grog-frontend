import { Component, Input, OnInit, signal } from '@angular/core';
import { GroceryList } from '../../../../../_shared/types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  @Input() listData!: GroceryList;

  isExpanded = signal(false);
  itemsLength = signal(0);

  ngOnInit(): void {
    this.itemsLength.set(this.listData.item.length);
  }

  edit() {
    console.log('edit')
  }
}
