import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SAceptadaEmpComponent } from './saceptada-emp.component';

describe('SAceptadaEmpComponent', () => {
  let component: SAceptadaEmpComponent;
  let fixture: ComponentFixture<SAceptadaEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SAceptadaEmpComponent]
    });
    fixture = TestBed.createComponent(SAceptadaEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
