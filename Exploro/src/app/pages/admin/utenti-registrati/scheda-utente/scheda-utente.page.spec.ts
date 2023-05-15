import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedaUtentePage } from './scheda-utente.page';

describe('SchedaUtentePage', () => {
  let component: SchedaUtentePage;
  let fixture: ComponentFixture<SchedaUtentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SchedaUtentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
