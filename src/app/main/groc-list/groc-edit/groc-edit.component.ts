import { Component, EventEmitter, Output } from '@angular/core';
import { ContentBoxActionBtnsComponent } from '../../_shared/components/content-box-action-btns/content-box-action-btns.component';
import { ContentBoxComponent } from '../../_shared/components/content-box/content-box.component';
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
  @Output() triggerSaveListEvent = new EventEmitter<null>();
  @Output() triggerCancelListEvent = new EventEmitter<null>();
}
