import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ContentBoxComponent } from '../../_shared/components/content-box/content-box.component';
import { ContentBoxActionBtnsComponent } from '../../_shared/components/content-box-action-btns/content-box-action-btns.component';
import { Router } from '@angular/router';
import { ENDPOINTS } from '../../../_shared/constants';
import { ListCreatorComponent } from './components/list-creator/list-creator.component';

@Component({
  selector: 'app-groc-edit',
  standalone: true,
  imports: [
    ContentBoxComponent,
    ContentBoxActionBtnsComponent,
    ListCreatorComponent,
  ],
  templateUrl: './groc-edit.component.html',
})
export class GrocEditComponent {
  @Output() triggerAddListItemEvent = new EventEmitter<null>();

  router = inject(Router);

  async onCancelList() {
    // todo
    await this.router.navigateByUrl(ENDPOINTS.GROC_LIST);
  }

  async onSaveList() {
    // todo
    await this.router.navigateByUrl(ENDPOINTS.GROC_LIST);
  }
}
