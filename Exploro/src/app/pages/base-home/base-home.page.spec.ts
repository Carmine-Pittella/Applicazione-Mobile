import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseHomePage } from './base-home.page';

describe('BaseHomePage', () => {
  let component: BaseHomePage;
  let fixture: ComponentFixture<BaseHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BaseHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
