import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordMyTennantsComponent } from './landlord-my-tennants.component';

describe('LandlordMyTennantsComponent', () => {
  let component: LandlordMyTennantsComponent;
  let fixture: ComponentFixture<LandlordMyTennantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordMyTennantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordMyTennantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
