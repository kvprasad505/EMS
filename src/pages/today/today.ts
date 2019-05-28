import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TodayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-today',
  templateUrl: 'today.html',
})
export class TodayPage {
  public data:any;
  public emptype:any='office';
  public off:any=true;
  public on:any=false;
  //public data : Array<{name :string, eid:string, attendance:any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider,
    public storage: Storage) {
      this.getemptype();
    // this.data=[
    //      {name: "prasad", eid:"12345",attendance:"Present"},
    //      {name: "avneesh", eid:"12346",attendance:"Absent"}
    // ];
  }

  getemptype(){
    this.storage.get('emptype').then((val) => {
      console.log('login type', val);
      this.emptype=val;
      this.getdata();
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TodayPage');
   // this.getdata();
  }

  getdata(){ 
    let data={
      emptype:this.emptype
    }
    this.service.todayattendance(data).then((data:any)=>{
      console.log("response",data);
      if(data.statuscode==1){
        this.data=data.data;
      }
    })
  }

  onChange(val){
    console.log("selected value",val);
    this.emptype=val;
    if(this.emptype=='office'){
      this.off=true;
      this.on=false;
    }else if(this.emptype=='on-field'){
      this.off=false;
      this.on=true;
    }
    this.getdata();
    
  }

}
