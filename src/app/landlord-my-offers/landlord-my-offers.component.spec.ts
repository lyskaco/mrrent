import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordMyOffersComponent } from './landlord-my-offers.component';

describe('LandlordMyOffersComponent', () => {
  let component: LandlordMyOffersComponent;
  let fixture: ComponentFixture<LandlordMyOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordMyOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordMyOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
