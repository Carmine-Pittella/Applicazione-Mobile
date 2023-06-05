import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreazioneCachePage } from './creazione-cache.page';

describe('CreazioneCachePage', () => {
  let component: CreazioneCachePage;
  let fixture: ComponentFixture<CreazioneCachePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreazioneCachePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
