import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordDetailsDialogComponent } from './landlord-details-dialog.component';

describe('LandlordDetailsDialogComponent', () => {
  let component: LandlordDetailsDialogComponent;
  let fixture: ComponentFixture<LandlordDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
