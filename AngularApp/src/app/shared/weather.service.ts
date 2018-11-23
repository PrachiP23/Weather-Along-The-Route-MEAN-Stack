import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Weather } from '../models/weather.model';

@Injectable()
export class WeatherService {
  selectedweatherLoc : Weather;

  readonly baseURL = 'http://localhost:3000/WeatherDetails';

  constructor(private http: HttpClient) { }

  postWeatherDetails(weather : Weather){
    return this.http.post(this.baseURL, weather);
}

}
