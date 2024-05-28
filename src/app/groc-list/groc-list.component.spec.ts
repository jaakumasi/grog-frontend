import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocListComponent } from './groc-list.component';

describe('GrocListComponent', () => {
  let component: GrocListComponent;
  let fixture: ComponentFixture<GrocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrocListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
