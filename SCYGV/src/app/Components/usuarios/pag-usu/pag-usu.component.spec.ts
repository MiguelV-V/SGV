import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagUsuComponent } from './pag-usu.component';

describe('PagUsuComponent', () => {
  let component: PagUsuComponent;
  let fixture: ComponentFixture<PagUsuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagUsuComponent]
    });
    fixture = TestBed.createComponent(PagUsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
