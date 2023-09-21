import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoliRevisarComponent } from './soli-revisar.component';

describe('SoliRevisarComponent', () => {
  let component: SoliRevisarComponent;
  let fixture: ComponentFixture<SoliRevisarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoliRevisarComponent]
    });
    fixture = TestBed.createComponent(SoliRevisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
