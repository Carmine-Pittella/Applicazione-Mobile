import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferitiPage } from './preferiti.page';

describe('PreferitiPage', () => {
  let component: PreferitiPage;
  let fixture: ComponentFixture<PreferitiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PreferitiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
