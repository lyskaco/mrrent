import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TennantDashboardComponent } from './tennant-dashboard.component';

describe('TennantDashboardComponent', () => {
  let component: TennantDashboardComponent;
  let fixture: ComponentFixture<TennantDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TennantDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TennantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
