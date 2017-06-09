import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSummaryComponent } from './dialog-summary.component';

describe('DialogSummaryComponent', () => {
  let component: DialogSummaryComponent;
  let fixture: ComponentFixture<DialogSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
