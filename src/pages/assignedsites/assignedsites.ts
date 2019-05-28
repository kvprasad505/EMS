import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
/**
 * Generated class for the AssignedsitesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-assignedsites',
  templateUrl: 'assignedsites.html',
})
export class AssignedsitesPage {
  public data:any=[];
  public data2:any=[];
  public data3:any=[];
  public eid:any;
  public reached:any=true;
  public finished:any=false;
  public status:any;
  public siteid:any;
  lat: any;
  lat2: any;
  lng: any;
  lng2: any;
  dis : any;
  public geoaddress: any;

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 1
  };

  
  //public data : Array<{name :string, eid:string, attendance:any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider,
    public storage: Storage, public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, 
    public loadingController: LoadingController, public alertCtrl: AlertController,
    public locationAccuracy: LocationAccuracy) {
      this.geteid();
    //  this.data=[
    //       {name: "prasad", eid:"12345",latitude:"24.25454",longitude:"15.884848",status:"pending",counter:0},
    //       {name: "avneesh", eid:"12346",latitude:"24.25454",longitude:"15.884848",status:"pending",counter:0}
    //  ];
  }

  geteid(){
    this.storage.get('eid').then((val) => {
      console.log('login type', val);
      this.eid=val;
      this.getdata();
    });
  }

  getdata(){
    let data={
      eid:this.eid,
      process:1
    }
    this.service.getassignedsites(data).then((data:any)=>{
      console.log("response",data);
      console.log("length",data.data.length);
      if(data.statuscode==1){
       // for(var i=0;i<data.data.length;i++){
        this.data=data.data;
       // this.data2[i]=({'content':false,'counter':0,'reached':true,'finished':false,'index':i})
        //this.data.splice(1,0,2);
       // }
        console.log("appended1",this.data);
        console.log("appended2",this.data2);
      }else{
        console.log(data.msg);
      }
    })
  }

  updatedata(){
    let data={
      eid:this.eid,
      siteid:this.siteid,
      status:this.status,
      process:2,
      dis:this.dis
    }
    this.service.getassignedsites(data).then((data:any)=>{
      console.log("response",data);
      if(data.statuscode==1){
        this.data=data.data;
      }else{
        console.log(data.msg);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignedsitesPage');
  }

  // enablecontent(i){
  //   console.log("asas",i);
  //   i.counter=i.counter+1;
  //   if(i.counter%2!=0)
  //   {
  //     i.content=true;
  //     //this.statusdisplay=true;
  //   }
  //   else{
  //     i.content=false;
  //   }
  // }

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
    let loader=this.loadingController.create({
      content:"please wait",
    });
    this.geolocation.getCurrentPosition().then( pos =>{
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      //this.getGeoencoder(this.lat,this.lng);
      loader.present().then(()=>{
        this.dis=this.calculateDistance(this.lat,this.lat2,this.lng,this.lng2);
        loader.dismiss();
        this.updatedata();
      });
      
    }).catch( err => console.log(err));
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

  calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }

//   isDupe(item){
//     var c=0;
//     console.log("dup",item);
//     //this.data3.push=item;
//     console.log("data3len",this.data3.length);
//     for(var i=0;i<this.data3.length;i++){
//       if(this.data3[i]==item.index){
//         c++;
//       }
//     }
//     if(c>0){
//     return false;
//     }
//     else{
//       this.data3.push(item.index);
//       console.log("data3",this.data3);
//       console.log("data3len2",this.data3.length);
//       return true;
//     }
//  }
  
  reachbtn(item){
    console.log("reachbtn",item);
    this.status='reached';
    this.reached=false;
    this.finished=true;

    let loader=this.loadingController.create({
      content:"please wait",
    });
    loader.present().then(()=>{
    //this.getlocation(item.latitude,item.longitude);
    loader.dismiss();
  });
    //this.updatedata(item.id,this.status);
    
  }
  
  itemclick(item){
    console.log("itemclick",item);
    this.lat2=item.latitude;
    this.lng2=item.longitude;
    this.siteid=item.id;
    if(item.status=='pending'){
      this.status='reached';
    this.getalertdialog('click yes if you reached to the site');
    }else{
      this.status='finished'
      this.getalertdialog('click yes if work is finished');
    }
  }

  getalertdialog(msg){
  const alert = this.alertCtrl.create({
    title: "alert", 
    subTitle: msg,
    buttons: [ {
      text: 'no',
      role: 'cancel',
      cssClass: 'secondary',
      handler: (blah) => {
      }
    }, {
      text: 'yes',
      handler: () => {
        this.locacc();
        
      }
    }]
  });
  alert.present();
}

}
