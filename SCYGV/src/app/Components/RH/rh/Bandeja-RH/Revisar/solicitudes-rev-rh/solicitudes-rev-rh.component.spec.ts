import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesRevRHComponent } from './solicitudes-rev-rh.component';

describe('SolicitudesRevRHComponent', () => {
  let component: SolicitudesRevRHComponent;
  let fixture: ComponentFixture<SolicitudesRevRHComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudesRevRHComponent]
    });
    fixture = TestBed.createComponent(SolicitudesRevRHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
