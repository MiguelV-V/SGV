import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SRechazadaEmpComponent } from './srechazada-emp.component';

describe('SRechazadaEmpComponent', () => {
  let component: SRechazadaEmpComponent;
  let fixture: ComponentFixture<SRechazadaEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SRechazadaEmpComponent]
    });
    fixture = TestBed.createComponent(SRechazadaEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
