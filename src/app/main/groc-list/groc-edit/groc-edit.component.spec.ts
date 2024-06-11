import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocEditComponent } from './groc-edit.component';

describe('GrocEditComponent', () => {
  let component: GrocEditComponent;
  let fixture: ComponentFixture<GrocEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrocEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrocEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
