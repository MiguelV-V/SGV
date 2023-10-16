import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoliAcepComponent } from './soli-acep.component';

describe('SoliAcepComponent', () => {
  let component: SoliAcepComponent;
  let fixture: ComponentFixture<SoliAcepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoliAcepComponent]
    });
    fixture = TestBed.createComponent(SoliAcepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
