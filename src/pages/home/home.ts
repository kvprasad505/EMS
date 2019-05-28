import { Component } from '@angular/core';
import { NavController,ToastController, MenuController,Events,LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/storage';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public eid:any;
  public password:any;
  public remember:any;
  
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,
    public service: ServiceProvider, public menuCtrl: MenuController, private storage: Storage,
    public events: Events, public locationTracker: LocationTrackerProvider,public loadingController: LoadingController) {
      this.menuCtrl.enable(false);
      this.rememberme();
  }
  rememberme(){
    this.storage.get('remeid').then((cu) => {
      this.eid=cu;
      });
      this.storage.get('rempswd').then((cu) => {
        this.password=cu;
      });
  }

  login(){
    if(this.eid && this.password){

      if(this.remember==true){
        this.storage.set('remeid',this.eid);
        this.storage.set('rempswd',this.password);
      }

    console.log("loginpresses");
    let data={
      eid: this.eid,
      password: this.password
    }
    let loader=this.loadingController.create({
      content:"please wait",
      //duration: 5000
    });
    loader.present().then(()=>{
    this.service.login(data).then((data:any)=>{
      console.log("response", data);
      if(data.statuscode==1){

        this.storage.set('eid',data.data[0].eid);
        this.storage.set('name',data.data[0].name);
        this.storage.set('logintype',data.data[0].logintype);
        this.storage.set('emptype',data.data[0].emptype);
        
        this.events.publish('user:setdata', data.data[0].eid, data.data[0].name);
        this.events.publish('user:created', data.data[0].logintype);

        this.locationTracker.startTracking();

        if(data.data[0].logintype=='A'){
        this.navCtrl.setRoot('AdminHomePage');
        }
        else{
          this.navCtrl.setRoot('UserHomePage');
        }
     
      }
      else{
        this.printtoast("user id or password wrong");
      }
    })
    loader.dismiss();
  });
  }else{
    this.printtoast("please fill all details");
  }
}



printtoast(msg){
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000,
    position: 'top'
  });
  toast.present();
}

}
