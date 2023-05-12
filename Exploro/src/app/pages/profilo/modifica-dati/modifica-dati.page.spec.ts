import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificaDatiPage } from './modifica-dati.page';

describe('ModificaDatiPage', () => {
  let component: ModificaDatiPage;
  let fixture: ComponentFixture<ModificaDatiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificaDatiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
