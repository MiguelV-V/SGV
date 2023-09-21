import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRHComponent } from './home-rh.component';

describe('HomeRHComponent', () => {
  let component: HomeRHComponent;
  let fixture: ComponentFixture<HomeRHComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeRHComponent]
    });
    fixture = TestBed.createComponent(HomeRHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
