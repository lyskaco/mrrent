import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBrokenComponent } from './dialog-broken.component';

describe('DialogBrokenComponent', () => {
  let component: DialogBrokenComponent;
  let fixture: ComponentFixture<DialogBrokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBrokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBrokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
