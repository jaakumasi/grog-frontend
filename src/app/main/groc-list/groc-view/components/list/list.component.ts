import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { GroceryList } from '../../../../../_shared/types';
import { DatePipe, NgStyle } from '@angular/common';
import { IconBtnComponent } from '../../../../_shared/components/icon-btn/icon-btn.component';
import { ActiveListService } from '../../services/active-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DatePipe, IconBtnComponent, NgStyle],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy {
  activeListService = inject(ActiveListService);

  @Input() listData!: GroceryList;

  isExpanded = signal(false);
  itemsLength = signal(0);

  activeListSubscription?: Subscription;

  ngOnInit(): void {
    this.itemsLength?.set(this.listData.items.length);
    this.subToActiveList();
  }

  ngOnDestroy(): void {
    this.activeListSubscription?.unsubscribe();
  }

  subToActiveList() {
    this.activeListService.activeList.subscribe((activeListId) => {
      if (this.listData.id !== activeListId) {
        this.isExpanded.set(false);
        return;
      }

      this.isExpanded.set(!this.isExpanded());
    });
  }

  onExpand() {
    this.activeListService.activeList.next(this.listData.id!);
  }

  edit() {
    console.log('edit');
  }
}
