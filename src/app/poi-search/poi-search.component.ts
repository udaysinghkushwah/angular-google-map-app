import { Component, OnInit, NgZone } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { MapDataService } from '../services/map-data.service';
import { MapsAPILoader } from '@agm/core';
declare var google: any;
@Component({

  selector: 'app-poi-search',
  templateUrl: './poi-search.component.html',
  styleUrls: ['./poi-search.component.scss']
})
export class PoiSearchComponent implements OnInit {

  source: string;
  destination: string;
  mapData: any = [];
  roomData: any;
  iconUrl: any;
  map = null;
  // google maps zoom level


  // initial center position for the map

  deepLinkUrl='';
  mapObject = {
    origin:{},
    destinationLoc:{},
    sourceAddress: '',
    destinationAddress: '',
    source: {
      lat: 51.673858,
      lng: 7.815982,
      zoom: 16,
    },
    destination: {
      lat: 51.673858,
      lng: 7.815982,
      zoom: 16
    },
    current: {
      lat: 34.6889895,
      lng: 135.8376218,
      zoom: 16
    }
  }

  constructor(private mapDataService: MapDataService, public mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {

  }

  ngOnInit() {

    this.loadMapData();
  }
  loadMapData() {
    this.mapDataService.getMapData().subscribe((responseData) => {
      // this.mapData = responseData;
      // this.resetIcon();
      // this.roomData = JSON.parse(JSON.stringify(this.mapData));
      // this.mapObject.current.lat = this.mapData[0].lat;
      // this.mapObject.current.lng = this.mapData[0].lon;
    });
  }

  resetIcon() {
    this.mapData = this.mapData.map((data) => {
      data.iconUrl = '../../assets/blue_marker.png';
      data.isActive = false;
      return data;
    });
  }
  clickedMarker(index: number) {
    this.resetIcon();
    this.mapData[index].iconUrl = '../../assets/orange_marker.png';
    this.source = this.mapData[index]['name'];

  }
  mapReady(map) {
    // here $event will be of type google.maps.Map 
    // and you can put your logic here to get lat lng for marker. I have just put a sample code. You can refactor it the way you want.
    this.map = map;
  }

  getLatLong(placeid: string, map: any, fn) {
    let placeService = new google.maps.places.PlacesService(map);
    placeService.getDetails({
      placeId: placeid
    }, function (result, status) {
      console.log(result.geometry.location.lat());
      console.log(result.geometry.location.lng())
    });
  }

  go() {
    let data = {
      "deptAddr": this.mapData[0]['formatted_address'],
      "deepLat": this.mapData[0]['lat'],
      "deptLon": this.mapData[0]['lng'],
      "destAddr": this.mapData[0]['formatted_address'],
      "destLat": this.mapData[0]['lat'],
      "destLon": this.mapData[0]['lng']
    }

    // this.mapDataService.sendGoRequest(data).subscribe((responseData) => {
    //  this.deepLinkUrl=responseData['data'].url;
    // },
    //   (error) => {

    //   });
  }

  mapClicked($event: MouseEvent) {
    console.log($event)

    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    let latlng = { lat: $event.coords.lat, lng: $event.coords.lng };

    geocoder.geocode({ 'location': latlng }, (results, status) => {
      this.ngZone.run(() => {
        if (status === 'OK') {
          if (results[0]) {
            if (this.mapData.length == 2) {
              this.mapData = [];
              this.mapObject.sourceAddress='';
              this.mapObject.destinationAddress='';
            }
            let responseData = results[0];
            responseData.lat = responseData.geometry.location.lat();
            responseData.lng = responseData.geometry.location.lng();
            this.mapObject.current.lat = responseData.lat;
            this.mapObject.current.lat = responseData.lat;

            if (this.mapData.length <= 2) {

              this.mapData.push(responseData);
              if (this.mapData.length == 1) {
                this.mapObject.sourceAddress = responseData.formatted_address;
                this.mapObject.origin['lat']=responseData.lat;
                this.mapObject.origin['lng']=responseData.lng;
              }
              else if (this.mapData.length == 2) {
                this.mapObject.destinationAddress = responseData.formatted_address;
                this.mapObject.destinationLoc['lat']=responseData.lat;
                this.mapObject.destinationLoc['lng']=responseData.lng;
              }
            }
            this.resetIcon();
            // this.map.setZoom(11);
            // var marker = new google.maps.Marker({
            //   position: latlng,
            //   map: this.map
            // });
            console.log(this.mapData)
            // infowindow.setContent(results[0].formatted_address);
            // infowindow.open(this.map, marker);
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    });
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }



}
