import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController,
  LoadingController} from 'ionic-angular';
  import { ServiceProvider } from '../../providers/service/service';
  import { Storage } from '@ionic/storage';


/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  pin:any;
  email:any;
  eid:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider,
    public alertCtrl: AlertController,public toastCtrl: ToastController,public loadingController: LoadingController,
    public storage: Storage) {
      this.geteid();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }
  geteid(){
    this.storage.get('eid').then((val) => {
      console.log('login type', val);
      this.eid=val;
    });
  }

  reset(){
    this.pin=Math.floor(100000 + Math.random() * 900000);
    let data={
      email:this.email,
      pin:this.pin,
      eid:this.eid,
      process:'1'
    }
    let loader=this.loadingController.create({
      content:"please wait",
      //duration: 5000
    });
    loader.present().then(()=>{
    this.service.changepassword(data).then((data:any)=>{
       console.log(this.pin);
       console.log("response data",data);
       loader.dismiss();
     
       if(data.statuscode==1){
        const alert = this.alertCtrl.create({
          //title: 'hai'+' '+data.data[0].name, 
          subTitle: 'Enter the 6 digit otp that has been sent to your email',
          inputs: [
            {
              name: 'otp',
              id: 'aaa',
              type: 'tel',
              placeholder: 'enter otp'
            },
            {
              name: 'psd',
              type: 'password',
              placeholder: 'new password',
              min:6,
              max:12
            }
          ],
          buttons: [
          {
              text: 'Cancel',
              role: 'cancel',
              handler: (blah) => {
              }
          },
          {
             text: 'Ok',
             handler: abc => {
             if(abc.otp==data.data[0].pin && abc.psd.length>=6){
              console.log("correct otp");
              let data2={
                id:data.data[0].eid,
                np:abc.psd,
                process:'2'
              }
               this.service.changepassword(data2).then((data:any)=>{
                console.log(data);
                this.showerrortoast('Password changed successfully');
            
               })
            }
            else{
              this.showerrortoast('otp is invalid');
              return false;
            }
            
           }
          }]
        });
       alert.present();
       }
       else{
        this.showerrortoast(data.msg);
       }
    })
  });
  }

  showerrortoast(msg : any){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
      cssClass:"custom-toast"
    });
    toast.present();
  }

}
