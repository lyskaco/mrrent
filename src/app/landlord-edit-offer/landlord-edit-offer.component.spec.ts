import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordEditOfferComponent } from './landlord-edit-offer.component';

describe('LandlordEditOfferComponent', () => {
  let component: LandlordEditOfferComponent;
  let fixture: ComponentFixture<LandlordEditOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordEditOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordEditOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
