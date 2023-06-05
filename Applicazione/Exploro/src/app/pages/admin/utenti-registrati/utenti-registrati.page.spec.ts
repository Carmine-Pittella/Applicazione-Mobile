import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtentiRegistratiPage } from './utenti-registrati.page';

describe('UtentiRegistratiPage', () => {
  let component: UtentiRegistratiPage;
  let fixture: ComponentFixture<UtentiRegistratiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UtentiRegistratiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
