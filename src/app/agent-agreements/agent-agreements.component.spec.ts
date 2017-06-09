import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAgreementsComponent } from './agent-agreements.component';

describe('AgentAgreementsComponent', () => {
  let component: AgentAgreementsComponent;
  let fixture: ComponentFixture<AgentAgreementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentAgreementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
