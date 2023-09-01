import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacedOrdersComponent } from './placed-orders.component';

describe('PlacedOrdersComponent', () => {
  let component: PlacedOrdersComponent;
  let fixture: ComponentFixture<PlacedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacedOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
