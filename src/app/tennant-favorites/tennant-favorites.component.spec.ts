import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TennantFavoritesComponent } from './tennant-favorites.component';

describe('TennantFavoritesComponent', () => {
  let component: TennantFavoritesComponent;
  let fixture: ComponentFixture<TennantFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TennantFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TennantFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
