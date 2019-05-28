import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';



/**
 * Generated class for the AddsitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addsite',
  templateUrl: 'addsite.html',
})
export class AddsitePage {
  public id: any;
  public name:any;
  public latitude:any;
  public longitude:any;
  myForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public service: ServiceProvider,public toastCtrl: ToastController,public formbuilder: FormBuilder) {
      this.myForm=formbuilder.group({
        name: new FormControl('',Validators.required),
        latitude: new FormControl('', Validators.required),
        longitude: new FormControl('', Validators.required),
        id: new FormControl('', Validators.required),
        
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddsitePage');
  }

  addsite(){
    let data={
      id: this.id,
      name: this.name,
      latitude: this.latitude,
      longitude:this.longitude

    }
    this.service.addsite(data).then((data:any)=>{
      console.log("response data", data);
      if(data.statuscode==1){
        this.printtoast("added successfully");
        console.log("added succesfully");
        this.myForm.reset();
        //this.navCtrl.setRoot('AdminHomePage');
      }
      else{
        console.log("adding failed");
      }

    })
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
