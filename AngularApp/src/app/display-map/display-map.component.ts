import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-display-map',
  templateUrl: './display-map.component.html',
  styleUrls: ['./display-map.component.css']
})
export class DisplayMapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  start = 'chicago, il';
  end = 'buffalo, ny';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  travelmode = google.maps.TravelMode;
  directionsStatus = google.maps.DirectionsStatus;

  latitude: any;
  longitude: any;

  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

  selectedMarkerType: string = "parking_lot_maps.png";

  isHidden = false;

  stepDisplay = new google.maps.InfoWindow;
  markerArray = [];

  ngAfterContentInit() {
    let mapProp = {
      center: new google.maps.LatLng(41.850033, -87.6500523),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.directionsDisplay.setMap(this.map);

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

  showCustomMarker() {


    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

    let location = new google.maps.LatLng(this.latitude, this.longitude);

    console.log(`selected marker: ${this.selectedMarkerType}`);

    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: this.iconBase + this.selectedMarkerType,
      title: 'Got you!'
    });
  }

  toggleMap() {
    this.isHidden = !this.isHidden;

    this.gmapElement.nativeElement.hidden = this.isHidden;
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: this.travelmode.DRIVING
    }, (response, status) => {
      if (status === this.directionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        this.showSteps(response, this.markerArray, this.stepDisplay, this.map);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

showSteps(directionResult, markerArray, stepDisplay, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    var myRoute = directionResult.routes[0].legs[0];
    console.log(myRoute);
    for (var i = 0; i < myRoute.steps.length; i++) {
      var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
      marker.setMap(map);
      marker.setPosition(myRoute.steps[i].start_location);
      this.attachInstructionText(
          stepDisplay, marker, myRoute.steps[i].instructions, map);
    }
  }

  attachInstructionText(stepDisplay, marker, text, map) {
    google.maps.event.addListener(marker, 'click', function() {
      // Open an info window when the marker is clicked on, containing the text
      // of the step.
      stepDisplay.setContent(text);
      stepDisplay.open(map, marker);
    });
  }
  constructor() { }

  ngOnInit() {
  }

}
