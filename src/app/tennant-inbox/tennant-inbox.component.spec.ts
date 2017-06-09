import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TennantInboxComponent } from './tennant-inbox.component';

describe('TennantInboxComponent', () => {
  let component: TennantInboxComponent;
  let fixture: ComponentFixture<TennantInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TennantInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TennantInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
