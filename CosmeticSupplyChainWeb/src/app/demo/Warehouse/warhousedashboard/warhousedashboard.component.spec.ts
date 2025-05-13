import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarhousedashboardComponent } from './warhousedashboard.component';

describe('WarhousedashboardComponent', () => {
  let component: WarhousedashboardComponent;
  let fixture: ComponentFixture<WarhousedashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarhousedashboardComponent]
    });
    fixture = TestBed.createComponent(WarhousedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
