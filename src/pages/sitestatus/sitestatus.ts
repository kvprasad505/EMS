import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the SitestatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sitestatus',
  templateUrl: 'sitestatus.html',
})
export class SitestatusPage {
  selectedsite: any;
  public values1 : any;
  public values2 : any;
  public data:any;
  public data2:any;
  selectedemp: any;
  sel_site:any=true;
  sel_emp:any=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider) {
    this.getdata();
  }

  togglechange(val){
    console.log("toggle",val.value);
    if(val.value==true){ 
      this.sel_site=false;
      this.sel_emp=true;
    }else{
     this.sel_site=true;
     this.sel_emp=false;
    }

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

 getsitedetails(){
   let data={
     siteid:this.selectedsite,
     process:1
   }
   this.service.getsitedetails(data).then((data:any)=>{
     console.log("response",data);
     if(data.statuscode==1){
       this.data=data.data;
     }else{
       console.log(data.msg);
     }
   })
 }

 getempdetails(){
  let data={
    eid:this.selectedemp,
    process:2
  }
  this.service.getsitedetails(data).then((data:any)=>{
    console.log("response",data);
    if(data.statuscode==1){
      this.data2=data.data;
    }else{
      console.log(data.msg);
    }
  })
}

 ionViewDidLoad() {
   console.log('ionViewDidLoad SiteListPage');
 }

 sitechange(event: {
   component: IonicSelectableComponent,
   value: any,
}) {
   console.log('selected site:', event.value.id);
   this.selectedsite=event.value.id;
   this.getsitedetails();
}

employeechange(event: {
 component: IonicSelectableComponent,
 value: any,
}) {
 console.log('selected employee:', event.value);
 this.selectedemp=event.value.eid;
 this.getempdetails();
}

}
