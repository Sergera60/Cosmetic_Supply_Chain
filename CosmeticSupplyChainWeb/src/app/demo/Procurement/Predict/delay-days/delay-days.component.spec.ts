import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayDaysComponent } from './delay-days.component';

describe('DelayDaysComponent', () => {
  let component: DelayDaysComponent;
  let fixture: ComponentFixture<DelayDaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelayDaysComponent]
    });
    fixture = TestBed.createComponent(DelayDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
