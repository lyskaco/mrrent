import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordSettingsComponent } from './landlord-settings.component';

describe('LandlordSettingsComponent', () => {
  let component: LandlordSettingsComponent;
  let fixture: ComponentFixture<LandlordSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
