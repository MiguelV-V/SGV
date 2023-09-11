import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoEmpleadoComponent } from './catalogo-empleado.component';

describe('CatalogoEmpleadoComponent', () => {
  let component: CatalogoEmpleadoComponent;
  let fixture: ComponentFixture<CatalogoEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoEmpleadoComponent]
    });
    fixture = TestBed.createComponent(CatalogoEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
