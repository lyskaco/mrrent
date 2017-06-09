import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNotifyComponent } from './dialog-notify.component';

describe('DialogNotifyComponent', () => {
  let component: DialogNotifyComponent;
  let fixture: ComponentFixture<DialogNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
