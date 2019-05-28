import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the Employeelist2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employeelist2',
  templateUrl: 'employeelist2.html',
})
export class Employeelist2Page {
  public item:any;
  myForm: FormGroup;
  public eid:any;
  public name:any;
  public designation:any;
  public email:any;
  public mobile:any;
  public emptype:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider,public toastCtrl: ToastController,public formbuilder: FormBuilder) {
    this.item=navParams.get('item');
    console.log(this.item);
    this.setdata(this.item);
    this.myForm=formbuilder.group({
      name: new FormControl('',Validators.required),
      eid: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Employeelist2Page');
  }

  setdata(item){
    this.eid=item.eid;
    this.email=item.email;
    this.designation=item.designation;
    this.mobile=item.mobile;
    this.name=item.name;
    this.emptype=item.emptype;
  }

  save(){
    let data={
      eid:this.eid,
      email:this.email,
      designation:this.designation,
      mobile:this.mobile,
      name:this.name,
      emptype:this.emptype
    }
    this.service.updateemployee(data).then((data:any)=>{
      this.printtoast(data.msg);
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
