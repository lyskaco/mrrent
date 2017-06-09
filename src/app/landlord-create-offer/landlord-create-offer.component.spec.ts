import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordCreateOfferComponent } from './landlord-create-offer.component';

describe('LandlordCreateOfferComponent', () => {
  let component: LandlordCreateOfferComponent;
  let fixture: ComponentFixture<LandlordCreateOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordCreateOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordCreateOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
