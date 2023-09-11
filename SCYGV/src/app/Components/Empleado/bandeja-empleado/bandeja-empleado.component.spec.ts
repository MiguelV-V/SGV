import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaEmpleadoComponent } from './bandeja-empleado.component';

describe('BandejaEmpleadoComponent', () => {
  let component: BandejaEmpleadoComponent;
  let fixture: ComponentFixture<BandejaEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandejaEmpleadoComponent]
    });
    fixture = TestBed.createComponent(BandejaEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
