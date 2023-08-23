import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCatalogoComponent } from './editar-catalogo.component';

describe('EditarCatalogoComponent', () => {
  let component: EditarCatalogoComponent;
  let fixture: ComponentFixture<EditarCatalogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCatalogoComponent]
    });
    fixture = TestBed.createComponent(EditarCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
