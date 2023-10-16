import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoliRechaComponent } from './soli-recha.component';

describe('SoliRechaComponent', () => {
  let component: SoliRechaComponent;
  let fixture: ComponentFixture<SoliRechaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoliRechaComponent]
    });
    fixture = TestBed.createComponent(SoliRechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
