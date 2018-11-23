import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaypointsComponent } from './waypoints.component';

describe('WaypointsComponent', () => {
  let component: WaypointsComponent;
  let fixture: ComponentFixture<WaypointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaypointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaypointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
