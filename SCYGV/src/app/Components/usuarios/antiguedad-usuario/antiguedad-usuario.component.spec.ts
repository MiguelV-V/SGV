import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiguedadUsuarioComponent } from './antiguedad-usuario.component';

describe('AntiguedadUsuarioComponent', () => {
  let component: AntiguedadUsuarioComponent;
  let fixture: ComponentFixture<AntiguedadUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AntiguedadUsuarioComponent]
    });
    fixture = TestBed.createComponent(AntiguedadUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
