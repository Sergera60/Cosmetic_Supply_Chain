import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbDelayComponent } from './prob-delay.component';

describe('ProbDelayComponent', () => {
  let component: ProbDelayComponent;
  let fixture: ComponentFixture<ProbDelayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProbDelayComponent]
    });
    fixture = TestBed.createComponent(ProbDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
