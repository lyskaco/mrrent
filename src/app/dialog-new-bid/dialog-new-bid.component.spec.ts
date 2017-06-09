import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewBidComponent } from './dialog-new-bid.component';

describe('DialogNewBidComponent', () => {
  let component: DialogNewBidComponent;
  let fixture: ComponentFixture<DialogNewBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
