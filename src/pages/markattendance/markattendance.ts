import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { ServiceProvider } from '../../providers/service/service';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

/**
 * Generated class for the MarkattendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-markattendance',
  templateUrl: 'markattendance.html',
})
export class MarkattendancePage {
  lat: any;
  lng: any;
  acc: any;
  public geoaddress: any;
  public emptype:any;
  public eid:any;
  public name:any;
  public in:any;
  public out:any;
  public dis:any;

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 1
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertController: AlertController, public geolocation: Geolocation,
    public storage: Storage,public service: ServiceProvider,private nativeGeocoder: NativeGeocoder,
    private locationAccuracy: LocationAccuracy) 
    {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarkattendancePage');
    this.locacc();
    this.getempdata();
  }

  callapi(){
    let data={
      eid:this.eid,
      emptype:this.emptype
    }

    this.service.clockstatus(data).then((data:any)=>{
      console.log("clockstatus response",data);
      if(data.statuscode==0){
        this.in=true;
        this.out=false;
      }else{
        if(data.data[0].clockin!=null && data.data[0].clockout!=null)
        {
        this.in=true;
        this.out=false;
      }else if(data.data[0].clockin!=null && data.data[0].clockout==null){
        this.in=false;
        this.out=true;
      }
    }
    })
  }

  getempdata(){
    this.storage.get('emptype').then((val) => {
      this.emptype=val;
      console.log("emptype",this.emptype);
    });
    this.storage.get('eid').then((val) => {
      this.eid=val;
      console.log("empeid",this.eid);
      this.callapi();
    });
    this.storage.get('name').then((val) => {
      this.name=val;
      console.log("empname",this.name);
    });
  }

  locacc(){
    // this.locationAccuracy.canRequest().then((canRequest: boolean) => {
    //   if(canRequest){
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        console.log("request succesful");
        this.getlocation()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
    //   }
    // });
  }  

  getlocation(){
    this.geolocation.getCurrentPosition().then( pos =>{
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      //this.getGeoencoder(this.lat,this.lng);
      console.log("test2",parseFloat(this.lat).toFixed(1));
      console.log("test2",parseFloat(this.lng).toFixed(1));
    }).catch( err => console.log(err));
  }

  calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }

  getGeoencoder(lat,lng){
    this.nativeGeocoder.reverseGeocode(lat, lng, this.geoencoderOptions)
    .then((result: NativeGeocoderReverseResult[]) => {
      this.geoaddress = this.generateAddress(result[0]);
      console.log("address is",this.geoaddress);
    })
    .catch((error: any) => {
      alert('Error getting location'+ JSON.stringify(error));
    });
  }

  generateAddress(addressObj){
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if(obj[val].length)
      address += obj[val]+', ';
    }
  return address.slice(0, -2);
}


  clockin(){
    let data={
      location:this.geoaddress,
      //location:'temporary address',
      eid:this.eid,
      name:this.name,
      emptype:this.emptype
    }
    if(this.emptype=="office"){
      this.dis=this.calculateDistance(this.lat,22.7624865,this.lng,75.8879204);
      console.log("dis",this.dis);
      if(this.dis<=100)
      {
        this.service.clockin(data).then((data:any)=>{
          console.log("response",data);
          if(data.statuscode==1){
            this.printalert('clockin successful');
            this.in=false;
            this.out=true;
          }else{
            this.printalert(data.msg);
          }
        
        })
      }else{
        this.printalert('sorry, you are not in office');
      }
    }
    else if(this.emptype=="on-field"){
      console.log("attendance for onfield");

      this.service.clockin(data).then((data:any)=>{
        console.log("response",data);
        if(data.statuscode==1){
          this.printalert('clockin successful');
          this.in=false;
          this.out=true;
        }else{
          this.printalert(data.msg);
        }
      
      })
    }
  }

  clockout(){
    let data={
      location:this.geoaddress,
      //location:'temporary address',
      eid:this.eid,
      name:this.name,
      emptype:this.emptype
    }
    
    if(this.emptype=="office"){
      this.dis=this.calculateDistance(this.lat,22.7624865,this.lng,75.8879204);
      console.log("dis",this.dis);
    if(this.dis<=100)
    {
    this.service.clockout(data).then((data:any)=>{
      console.log("response",data);
      if(data.statuscode==1){
        this.printalert('clockout successful');
        this.in=true;
        this.out=false;
      }else{
        this.printalert(data.msg);
      }
    
    })
  }else{
    this.printalert('sorry, you are not in office');
  }}
  else if(this.emptype=="on-field"){
    this.service.clockout(data).then((data:any)=>{
      console.log("response",data);
      if(data.statuscode==1){
        this.printalert('clockout successful');
        this.in=true;
        this.out=false;
      }else{
        this.printalert(data.msg);
      }
    })
  }
}

  printalert(msg){
    const alert = this.alertController.create({
      title: 'Alert',
      subTitle: 'Admin Says!',
      message: msg,
      buttons: ['OK']
  });
  alert.present();
  }

}
