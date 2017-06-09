import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TennantPanelComponent } from './tennant-panel.component';

describe('TennantPanelComponent', () => {
  let component: TennantPanelComponent;
  let fixture: ComponentFixture<TennantPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TennantPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TennantPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
