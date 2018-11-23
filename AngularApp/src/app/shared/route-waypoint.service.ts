import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {RouteWaypoint} from '../models/route-waypoint.model';

@Injectable()
export class RouteWaypointService {
  selectedWaypoint : RouteWaypoint;
  allWaypoints: RouteWaypoint[];
  readonly baseURL = 'http://localhost:3000/RouteWaypoint';

  constructor(private http: HttpClient) { }

  postWaypoints(wypts : RouteWaypoint){
      return this.http.post(this.baseURL, wypts);
  }

  getWaypoints(){
    return this.http.get(this.baseURL);
  }

  

}
