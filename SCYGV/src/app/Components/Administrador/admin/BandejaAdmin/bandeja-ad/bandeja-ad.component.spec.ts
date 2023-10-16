import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaAdComponent } from './bandeja-ad.component';

describe('BandejaAdComponent', () => {
  let component: BandejaAdComponent;
  let fixture: ComponentFixture<BandejaAdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandejaAdComponent]
    });
    fixture = TestBed.createComponent(BandejaAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
