import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';
import { HomePage } from '../home/home';

/**
 * Generated class for the AddemployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addemployee',
  templateUrl: 'addemployee.html',
})
export class AddemployeePage {
  public emptype: any;
  public name:any;
  public email:any;
  public mobile:any;
  public gender:any;
  public password:any;
  public eid:any;
  public designation:any;
  public utype:any;
  myForm: FormGroup;

  validation_messages = {
    'Name': [
      { type: 'required', message: 'name is required' }],
    'Email': [
      { type: 'required', message: 'email is required.' },
      { type: 'pattern', message: 'please enter correct email'} ],
    'Mobile': [
      { type: 'required', message: 'mobile no is required.' },
      { type: 'minlength', message: 'please enter correct number'} ],
    'Password': [
      { type: 'required', message: 'password length 6 to 12' },
      { type: 'pattern', message: 'should contain atleast 1 caps,small,symbol,numb' }],
    'eid': [
      {type: 'required', message: 'please enter eid'}],
    'designation': [
      {type: 'required', message: 'please enter designation'}]
}

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: 
    AlertController,public formbuilder: FormBuilder,public service: ServiceProvider,public toastCtrl: ToastController,) {
      this.myForm=formbuilder.group({
        mobile: new FormControl('',Validators.compose([Validators.required,Validators.minLength(10)])),
        name: new FormControl('',Validators.required),
        email: new FormControl('',Validators.compose([Validators.required,Validators.pattern('[a-z A-Z . 0-9]+@[a-z .]+.(com|in)')])),
        gender: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        eid: new FormControl('', Validators.required),
        designation: new FormControl('', Validators.required),
        pass: new FormControl('', Validators.compose([Validators.required,Validators.minLength(6)]))
  }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddemployeePage');
  }

  addemp(){
    let data={
      name: this.name,
      eid: this.eid,
      designation: this.designation,
      email: this.email,
      mobile: this.mobile,
      password: this.password,
      gender: this.gender,
      emptype: this.emptype,
    }
    this.service.addemployee(data).then((data:any)=>{
      console.log("response data", data);
      if(data.statuscode==1){
        this.printtoast("added successfully");
        console.log("added succesfully");
        this.navCtrl.setRoot('AdminHomePage');
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
