import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCleaningComponent } from './dialog-cleaning.component';

describe('DialogCleaningComponent', () => {
  let component: DialogCleaningComponent;
  let fixture: ComponentFixture<DialogCleaningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCleaningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCleaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
