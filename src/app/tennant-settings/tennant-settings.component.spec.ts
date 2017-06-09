import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TennantSettingsComponent } from './tennant-settings.component';

describe('TennantSettingsComponent', () => {
  let component: TennantSettingsComponent;
  let fixture: ComponentFixture<TennantSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TennantSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TennantSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
