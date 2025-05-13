import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionDashboardComponent } from './distribution-dashboard.component';

describe('DistributionDashboardComponent', () => {
  let component: DistributionDashboardComponent;
  let fixture: ComponentFixture<DistributionDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionDashboardComponent]
    });
    fixture = TestBed.createComponent(DistributionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
