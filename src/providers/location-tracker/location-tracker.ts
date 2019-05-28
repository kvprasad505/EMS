import { HttpClient } from '@angular/common/http';
import { Injectable,NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition  } from '@ionic-native/geolocation';
import {Events} from 'ionic-angular';
import 'rxjs/add/operator/filter';

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationTrackerProvider {
  public watch: any;
  public lat:number =0;
  public lng:number =0;

  constructor(public http: HttpClient,public zone: NgZone,private backgroundGeolocation: BackgroundGeolocation,
    public geo: Geolocation,public events: Events) {
    console.log('Hello LocationTrackerProvider Provider');
  }
  startTracking() {
    // Background Tracking

    let config = {
     desiredAccuracy: 0,
     stationaryRadius: 20,
     distanceFilter: 10, 
     debug: true,
     interval: 10000 
   };

   this.backgroundGeolocation.configure(config).subscribe((location) => {

     console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

     // Run update inside of Angular's zone
     this.zone.run(() => {
       this.lat = location.latitude;
       this.lng = location.longitude;
     });

   }, (err) => {

     console.log(err);

   });

   // Turn ON the background-geolocation system.
   this.backgroundGeolocation.start();

   // Foreground Tracking

 let options = {
   //frequency: 3000,
   //timeout: 60000, 
   interval:10000,
   enableHighAccuracy: true
 };

 this.watch = this.geo.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

   console.log(position);
  // this.events.publish('user:test', "data");

   // Run update inside of Angular's zone
   this.zone.run(() => {
     this.lat = position.coords.latitude;
     this.lng = position.coords.longitude;
   });

 });

// this.geo.getCurrentPosition(options).then( pos =>{
//   this.lat = pos.coords.latitude;
//   this.lng = pos.coords.longitude;
//   console.log("test geo",pos);
//   //this.getGeoencoder(this.lat,this.lng); 
// }).catch( err => console.log(err));

 }

 stopTracking() {
   console.log('stopTracking');
   this.backgroundGeolocation.finish();
  // this.watch.unsubscribe();

 }


}
