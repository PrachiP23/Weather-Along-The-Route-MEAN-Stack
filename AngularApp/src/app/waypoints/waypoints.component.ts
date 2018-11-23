import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { } from 'googlemaps';

import { RouteWaypointService } from '../shared/route-waypoint.service';
import { WeatherService } from '../shared/weather.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
//import { RouteWaypoint } from '../models/route-waypoint.model';

@Component({
  selector: 'app-waypoints',
  templateUrl: './waypoints.component.html',
  styleUrls: ['./waypoints.component.css'],
  providers: [RouteWaypointService,
    WeatherService]
})
export class WaypointsComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  markerArray = [];
 
  travelmode = google.maps.TravelMode;
  stepDisplay = new google.maps.InfoWindow;
  latitude: any;
  longitude: any;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionsService = new google.maps.DirectionsService;
  directionsStatus = google.maps.DirectionsStatus;

  isHidden = false;
  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';


  constructor(private routeWaypointService: RouteWaypointService, private weatherService: WeatherService) { }

  ngOnInit() {
    this.resetForm();
    
  }

  ngAfterContentInit() {
    let mapProp = {
      center: new google.maps.LatLng(41.850033, -87.6500523),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.directionsDisplay.setMap(this.map);
    this.gmapElement.nativeElement.hidden = this.isHidden;
  }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }

  setCenter() {
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

    let location = new google.maps.LatLng(this.latitude, this.longitude);

    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Got you!'
    });

    marker.addListener('click', this.simpleMarkerHandler);

    marker.addListener('click', () => {
      this.markerHandler(marker);
    });
  }

  simpleMarkerHandler() {
    alert('Simple Component\'s function...');
  }

  markerHandler(marker: google.maps.Marker) {
    alert('Marker\'s Title: ' + marker.getTitle());
  }


  resetForm(form?: NgForm) {
   
    if (form)
      form.reset();
    this.routeWaypointService.selectedWaypoint = {
      _id: "",
      origin: "",
      destination: "",
      mode: "",
      result: "",
      request: "",
      
    }

  }

  onSubmit(form?: NgForm) {

    this.routeWaypointService.postWaypoints(form.value).subscribe((res) => {
      this.setWaypoints(res);
      this.resetForm(form);
    });
  }

  setWaypoints(res) {
    if(res.result.status=='ZERO_RESULTS'){
        this.gmapElement.nativeElement.hidden = !this.isHidden;
    }else{
        this.gmapElement.nativeElement.hidden = this.isHidden;
        res.result.routes = this.typecastRoutes(res.result.routes);
        res.result = Object.assign(res.result, res.request);
        this.directionsDisplay.setDirections(res.result);
        this.showSteps(res.result, this.markerArray,  this.map);
    }
  }

 
  showSteps(directionResult, markerArray, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
  //  var myRoute = directionResult.routes[0].legs[0];
    const markerArr = [];
    const mult = [];
    
    
    for (var i = 0; i < directionResult.routes[0].overview_path.length; ) {
    //  markerArray[i] = null;
      if (i==0 || i == directionResult.routes[0].overview_path.length - 1 || i < directionResult.routes[0].overview_path.length) {
        var marker =  markerArray[i] = markerArray[i] || new google.maps.Marker;
        marker.setMap(map);
        marker.setPosition(directionResult.routes[0].overview_path[i]);
        markerArr.push(marker);
     /*   var weather = {
          lat: directionResult.routes[0].overview_path[i].lat,
          lng: directionResult.routes[0].overview_path[i].lng,
          origin: directionResult.request.origin,
          destination:  directionResult.request.destination,
          travelMode: directionResult.request.travelMode,
          weatherDetails: "",
        }; */

      //  var weather =   Object.assign(directionResult.request, directionResult.routes[0].overview_path[i]);
        var weather  =  directionResult.routes[0].overview_path[i];
        mult.push(this.weatherService.postWeatherDetails(weather));
      } 
      i = i + 60;
    }
    forkJoin(mult).subscribe(((res) => {
      //    this.setWaypoints(res);
      let j = 0;
      let k = 0;
      res.forEach((ele: any) => {
        const weatherStr = 'Place : ' +  ele.name + '; Weather : ' + ele.weather[0].description +
        ';  Minimum Temperature :' + ele.main.temp_min  + ';  Maximum Temperature :' + ele.main.temp_max + ' °F ; Visibility :' + ele.visibility + '; Wind Speed : ' + ele.wind.speed + ' mph';
        this.attachInstructionText(markerArr[k],  map, weatherStr);
          j = j + 10;
          k++;
      });
    }));
  }

  attachInstructionText(marker, map, weatherDetails) {
    //  this.weatherService.postWeatherDetails(startLoc).subscribe((res) => {
    // });
    google.maps.event.addListener(marker, 'click', function () {
      //   this.weatherService.postWeatherDetails(startLoc).subscribe((res) => {
      // Open an info window when the marker is clicked on, containing the text
      // of the step.
      //    console.log(res)  ;
     
      const infowindow = new google.maps.InfoWindow({
        content: weatherDetails
      }); 
      infowindow.open(map, marker);
    });
  }

  asLatLng(latLngObject) {
    return new google.maps.LatLng(latLngObject.lat, latLngObject.lng);
  }
  asBounds(boundsObject) {
    return new google.maps.LatLngBounds(this.asLatLng(boundsObject.southwest),
      this.asLatLng(boundsObject.northeast));
  }



  asPath(encodedPolyObject) {
    return google.maps.geometry.encoding.decodePath(encodedPolyObject.points);
  }

  typecastRoutes(routes) {
    routes.forEach((route) => {
      route.bounds = this.asBounds(route.bounds);
      // I don't think `overview_path` is used but it exists on the
      // response of DirectionsService.route()
      route.overview_path = this.asPath(route.overview_polyline);

      route.legs.forEach((leg) => {
        leg.start_location = this.asLatLng(leg.start_location);
        leg.end_location = this.asLatLng(leg.end_location);

        leg.steps.forEach((step) => {
          step.start_location = this.asLatLng(step.start_location);
          step.end_location = this.asLatLng(step.end_location);
          step.path = this.asPath(step.polyline);
        });

      });
    });
    return routes;
  }

}
