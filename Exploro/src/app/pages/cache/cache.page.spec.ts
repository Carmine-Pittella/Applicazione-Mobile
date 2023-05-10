import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CachePage } from './cache.page';

describe('CachePage', () => {
  let component: CachePage;
  let fixture: ComponentFixture<CachePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CachePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
