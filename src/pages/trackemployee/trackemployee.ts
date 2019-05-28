import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ServiceProvider } from '../../providers/service/service';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
/**
 * Generated class for the TrackemployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trackemployee',
  templateUrl: 'trackemployee.html',
})
export class TrackemployeePage {
  public values1 : any;
  public values2 : any;
  public data : any=[];
  public emp_lat : any;
  public emp_lon : any;
  public selectedemp : any;
  public geoaddress:any;

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 1
  };


  constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider,
    private nativeGeocoder: NativeGeocoder) {
    this.getdata();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackemployeePage');
  }

  getdata(){
    this.service.assignsite().then((data:any)=>{
      console.log("response",data);
      if(data.statuscode==1){
        this.values1=data.data2;
        //this.values2=data.data2;
      }else{
        console.log(data.msg);
      }
    })
  }

  employeeChange(event: {
    component: IonicSelectableComponent,
    value: any ,
  }) {
    console.log('selected employee:', event.value);
    this.selectedemp=event.value.eid;
  }

  track(){
    let data={
      eid:this.selectedemp,
      process:'2'
    }
    this.service.trackemp(data).then((data:any)=>{
      console.log("track response",data);
      if(data.statuscode==1){
        this.values2=data.data;
        for(var i=0;i<data.data.length;i++){
          this.emp_lat=data.data[i].latitude;
          this.emp_lon=data.data[i].longitude;
          this.getGeoencoder(this.emp_lat,this.emp_lon);
         // this.data.push(this.geoaddress);
        }
        console.log("i",this.data);
      // this.emp_lat=data.data[0].latitude;
      // this.emp_lon=data.data[0].longitude;
      // this.getGeoencoder(this.emp_lat,this.emp_lon);
      }
    })
  }

  getGeoencoder(lat,lng){
    this.nativeGeocoder.reverseGeocode(lat, lng, this.geoencoderOptions)
    .then((result: NativeGeocoderReverseResult[]) => {
      this.geoaddress = this.generateAddress(result[0]);
      this.data.push(this.geoaddress);
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

  }

