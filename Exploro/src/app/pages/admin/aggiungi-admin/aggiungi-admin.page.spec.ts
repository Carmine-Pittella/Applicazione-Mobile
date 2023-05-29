import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AggiungiAdminPage } from './aggiungi-admin.page';

describe('AggiungiAdminPage', () => {
  let component: AggiungiAdminPage;
  let fixture: ComponentFixture<AggiungiAdminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AggiungiAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
