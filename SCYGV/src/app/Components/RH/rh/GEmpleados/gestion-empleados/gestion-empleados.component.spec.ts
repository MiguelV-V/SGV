import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEmpleadosComponent } from './gestion-empleados.component';

describe('GestionEmpleadosComponent', () => {
  let component: GestionEmpleadosComponent;
  let fixture: ComponentFixture<GestionEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionEmpleadosComponent]
    });
    fixture = TestBed.createComponent(GestionEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
