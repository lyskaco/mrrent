import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessageAgentComponent } from './dialog-message-agent.component';

describe('DialogMessageAgentComponent', () => {
  let component: DialogMessageAgentComponent;
  let fixture: ComponentFixture<DialogMessageAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMessageAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMessageAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
