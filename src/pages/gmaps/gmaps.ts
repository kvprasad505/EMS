import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Storage } from '@ionic/storage';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the GmapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gmaps',
  templateUrl: 'gmaps.html',
})
export class GmapsPage {
  map: any;
  lat: any;
  lng: any;
  acc: any;
  public emptype:any;
  public eid:any;
  public name:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public geo: Geolocation,
    private locationAccuracy: LocationAccuracy,public storage: Storage,public service: ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GmapsPage');
    //this.loadmap();
    //this.locacc();
    this.geoloc();
    this.getempdata();
  }

  getempdata(){
    this.storage.get('emptype').then((val) => {
      this.emptype=val;
      console.log("emptype",this.emptype);
    });
    this.storage.get('eid').then((val) => {
      this.eid=val;
      console.log("empeid",this.eid);
    });
    this.storage.get('name').then((val) => {
      this.name=val;
      console.log("empname",this.name);
    });
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
        console.log("latitude",e.latitude);
        console.log("longitude",e.longitude);
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
      })
  }

  locacc(){
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => {
          // When GPS Turned ON call method to get Accurate location coordinates
          this.geoloc()
        },
        error => alert('Error requesting location permissions ' + JSON.stringify(error))
      );

      // this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      //   if(canRequest) {
      //     // the accuracy option will be ignored by iOS
      //     this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      //       () => {console.log('Request successful');
      //       this.geoloc();},
      //       error => console.log('Error requesting location permissions', error)
      //     );
      //   }
      
      // });
  }

  geoloc(){
  //   let options = {
  //     enableHighAccuracy: true,
  //     timeout: 30000,
  //     maximumAge: 0
  //  };
    this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      this.acc = pos.coords.accuracy;
      console.log("newlatitude",this.lat);
      console.log("newlongitude",this.lng);
      console.log("newacc",this.acc);
    }).catch( err => console.log(err));
  
  }

  clockin(){
    let data={
      lat:this.lat,
      lon:this.lng,
      eid:this.eid,
      name:this.name,
      emptype:this.emptype
    }
    if(this.emptype=="office"){
      if(this.lat==22.766489 && this.lng==75.8826351)
      {
        this.service.clockin(data).then((data:any)=>{
          console.log("response",data);
        })
      }
    }
    else if(this.emptype=="on-field"){

    }

    }
  

}
