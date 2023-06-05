import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RichiesteApprovazionePage } from './richieste-approvazione.page';

describe('RichiesteApprovazionePage', () => {
  let component: RichiesteApprovazionePage;
  let fixture: ComponentFixture<RichiesteApprovazionePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RichiesteApprovazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
