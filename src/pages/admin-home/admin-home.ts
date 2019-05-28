import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the AdminHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl: MenuController) {
      this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminHomePage');
  }

  addemployee(){
    this.navCtrl.push('AddemployeePage');
  }

  today(){
    this.navCtrl.push('TodayPage');
  }

  addsite(){
    this.navCtrl.push('AddsitePage');
  }

  assignsite(){
    this.navCtrl.push('AssignsitePage');
  }
  
}
