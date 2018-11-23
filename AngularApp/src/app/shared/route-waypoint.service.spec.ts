import { TestBed, inject } from '@angular/core/testing';

import { RouteWaypointService } from './route-waypoint.service';

describe('RouteWaypointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteWaypointService]
    });
  });

  it('should be created', inject([RouteWaypointService], (service: RouteWaypointService) => {
    expect(service).toBeTruthy();
  }));
});
