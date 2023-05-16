import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DettagliCachePage } from './dettagli-cache.page';

describe('DettagliCachePage', () => {
  let component: DettagliCachePage;
  let fixture: ComponentFixture<DettagliCachePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DettagliCachePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
