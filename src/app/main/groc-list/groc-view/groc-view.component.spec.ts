import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocViewComponent } from './groc-view.component';

describe('GrocViewComponent', () => {
  let component: GrocViewComponent;
  let fixture: ComponentFixture<GrocViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrocViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrocViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
