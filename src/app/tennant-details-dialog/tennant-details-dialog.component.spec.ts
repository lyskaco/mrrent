import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TennantDetailsDialogComponent } from './tennant-details-dialog.component';

describe('TennantDetailsDialogComponent', () => {
  let component: TennantDetailsDialogComponent;
  let fixture: ComponentFixture<TennantDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TennantDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TennantDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
