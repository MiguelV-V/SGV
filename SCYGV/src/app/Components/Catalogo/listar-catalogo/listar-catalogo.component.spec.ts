import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCatalogoComponent } from './listar-catalogo.component';

describe('ListarCatalogoComponent', () => {
  let component: ListarCatalogoComponent;
  let fixture: ComponentFixture<ListarCatalogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarCatalogoComponent]
    });
    fixture = TestBed.createComponent(ListarCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
