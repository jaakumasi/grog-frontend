import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { ENDPOINTS, REDUCERS } from '../../../../_shared/constants';
import { GlobalState, SCREEN_SIZE } from '../../../../_shared/types';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  store = inject(Store);
  screenSize!: SCREEN_SIZE;

  grocList = ENDPOINTS.GROC_LIST;
  geo = ENDPOINTS.GEO;
  stats = ENDPOINTS.STATS;

  ngOnInit(): void {
    this.store
      .select(REDUCERS.GLOBAL_STATE_REDUCER)
      .subscribe((state: GlobalState) => (this.screenSize = state.screenSize));
  }
}
