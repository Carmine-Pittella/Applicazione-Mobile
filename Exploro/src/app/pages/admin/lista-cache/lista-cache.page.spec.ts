import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaCachePage } from './lista-cache.page';

describe('ListaCachePage', () => {
  let component: ListaCachePage;
  let fixture: ComponentFixture<ListaCachePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaCachePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
