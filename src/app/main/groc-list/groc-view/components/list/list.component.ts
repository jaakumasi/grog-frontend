import { Component, Input, OnInit, signal } from '@angular/core';
import { GroceryList } from '../../../../../_shared/types';
import { DatePipe, NgStyle } from '@angular/common';
import { IconBtnComponent } from '../../../../_shared/components/icon-btn/icon-btn.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DatePipe, IconBtnComponent, NgStyle],
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
