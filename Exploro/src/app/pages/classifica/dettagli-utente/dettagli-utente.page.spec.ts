import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DettagliUtentePage } from './dettagli-utente.page';

describe('DettagliUtentePage', () => {
  let component: DettagliUtentePage;
  let fixture: ComponentFixture<DettagliUtentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DettagliUtentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
