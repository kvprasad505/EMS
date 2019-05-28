import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the AssignsitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assignsite',
  templateUrl: 'assignsite.html',
})
export class AssignsitePage {
  public values1 : any;
  public values2 : any;
  public selectedsite : any;
  public selectedemp : any;
  public port : any;
  public port2 : any;
  public btn:any=true;

  constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider,
    public alertCtrl: AlertController,public toastCtrl: ToastController) {
    this.getdata();
  }

  getdata(){
    this.service.assignsite().then((data:any)=>{
      console.log("response",data);
      if(data.statuscode==1){
        this.values1=data.data;
        this.values2=data.data2;
      }else{
        console.log(data.msg);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignsitePage');
  }

  siteChange(event: {
    component: IonicSelectableComponent,
    value: any ,
}) {
    console.log('selected site:', event.value.id);
    this.selectedsite=event.value.id;
}

employeeChange(event: {
  component: IonicSelectableComponent,
  value: any ,
}) {
  console.log('selected employee:', event.value);
  this.selectedemp=event.value.eid;
  this.btn=false;
}

assign(){
  let data={
    siteid:this.selectedsite,
    eid:this.selectedemp
  }
  if(this.selectedsite && this.selectedemp){
  this.service.assignsite2(data).then((data:any)=>{
    console.log("assign response",data);
    if(data.statuscode==1){
      this.port="";
      this.port2="";
      this.printalert(data.msg);
    }
  })
}else{
  this.printtoast('please select all field')
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

printalert(msg){
  const alert = this.alertCtrl.create({
    title: 'Alert',
    message: msg,
    buttons: ['OK']
});
alert.present();
}


}
