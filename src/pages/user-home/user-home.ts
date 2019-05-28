import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UserHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-home',
  templateUrl: 'user-home.html',
})
export class UserHomePage {
  public eid:any;
  public emptype:any;
  public attendance:any;
  public assignedsites: any;
  public card1:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController,
    public alertController: AlertController,public service: ServiceProvider,private storage: Storage) {
    this.menuCtrl.enable(true);
    this.getid();
  }
  getid(){
    this.storage.get('eid').then((cu) => {
      this.eid=cu;

      this.storage.get('emptype').then((cu) => {
        this.emptype=cu;
        this.setcard();
        this.getattendance();
        });
      });

  }
  setcard(){
    if(this.emptype=='on-field'){
      this.assignedsites=true;
      this.card1=true;
    }else{
      this.assignedsites=false;
      this.card1=true;
    }
  }

  getattendance(){
    let data={
      eid:this.eid,
      emptype:this.emptype
    }
    this.service.totalattendance(data).then((data:any)=>{
      console.log("total att",data.data);
      this.attendance=data.data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserHomePage');
    
  }
  markattendance(){
    this.navCtrl.push('MarkattendancePage');
  }

  sites(){
    this.navCtrl.push('AssignedsitesPage');
  }

}
