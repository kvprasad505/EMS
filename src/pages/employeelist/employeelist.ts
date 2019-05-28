import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the EmployeelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employeelist',
  templateUrl: 'employeelist.html',
})
export class EmployeelistPage {
  public data:any;
  issearchbaropened:any=false;
  listsearchbaropened=true;

  constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider,
  private viewCtrl: ViewController) {
   this.getdata(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeelistPage');
  }

  searchbaropened(val){
    if(val==true){
    this.issearchbaropened=true;
    this.listsearchbaropened=false;
    this.viewCtrl.showBackButton(false);
    }
    else{
      this.issearchbaropened=false;
    this.listsearchbaropened=true;
    this.viewCtrl.showBackButton(true);
    }
  }

  onsearch(val){
    console.log(val.value);
  }

  getdata(){
    this.service.employeelist().then((data:any)=>{
      console.log("response",data);
      if(data.statuscode==1){
        this.data=data.data;
      }else{
        console.log(data.msg);
      }
    })
  }

  itemclick(item){
    console.log("itemsel",item);
    this.navCtrl.push('Employeelist2Page',{
      item:item
    });
  }

}
