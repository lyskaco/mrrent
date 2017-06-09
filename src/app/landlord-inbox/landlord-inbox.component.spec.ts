import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordInboxComponent } from './landlord-inbox.component';

describe('LandlordInboxComponent', () => {
  let component: LandlordInboxComponent;
  let fixture: ComponentFixture<LandlordInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
