import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController,Events,LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { ServiceProvider } from '../providers/service/service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  public eid:any;
  public name:any;

  pages: Array<{title: string, component: any, index:any, icon: string}>;
  user: Array<{title: string, component: any, index:any, icon: string}>;
  admin: Array<{title: string, component: any, index:any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen, public alertCtrl: AlertController,public storage: Storage,
    public events: Events, public locationTracker: LocationTrackerProvider,public service: ServiceProvider,
    public loadingController: LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.admin = [
      { title: 'Home', component: 'AdminHomePage', index: 0, icon: 'home'},
      { title: 'employee list', component: 'EmployeelistPage', index: 1, icon: 'people'},
      { title: 'Site status', component: 'SitestatusPage', index: 2, icon: 'list-box'},
      { title: 'track employee', component: 'TrackemployeePage', index: 3, icon: 'list-box'},
      { title: 'change password', component: 'ChangepasswordPage', index: 4, icon: 'lock'},
      { title: 'Logout', component: HomePage, index: 9, icon: 'log-out'},
    ];

    this.user = [
      { title: 'Home', component: 'UserHomePage', index: 0, icon: 'home'},
      { title: 'change password', component: 'ChangepasswordPage', index: 1, icon: 'lock'},
      { title: 'Logout', component: HomePage, index: 9, icon: 'log-out'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     
      //this.stop();

      this.storage.get('eid').then((eid) => {
        console.log('current user is', eid);
        if(eid){
          let loader=this.loadingController.create({
            content:"please wait",
            //duration: 5000
          });
          loader.present().then(()=>{
          
          this.eid=eid;
          this.storage.get('logintype').then((type) => {
            console.log('login type', type);
            this.rootPage=(type=="A") ? 'AdminHomePage' : 'UserHomePage';
            this.pages=(type=="A") ? this.admin : this.user;
            this.storage.get('name').then((name) => {
              this.name=name;
              this.locationTracker.startTracking();
              loader.dismiss();
             // this.start();
            });
            });
          });
        }
        else{
          this.rootPage=HomePage;
        }
      });
    });

    this.events.subscribe('user:test',(data)=>{
      console.log("event3");
      this.start();
    });

    this.events.subscribe('user:setdata', (eid,name)=>{
      console.log("events called2",eid);
      console.log("events called2",name);
      this.eid=eid;
      this.name=name;
      // this.start();
    });

    this.events.subscribe('user:created', (ut) => {
      console.log("events called",ut);
       if(ut=="A"){this.pages=this.admin;}
       else if(ut=="U"){
          this.pages=this.user;
        }
      });
  }

  start(){
    //this.locationTracker.startTracking();
    let data={
      latitude:this.locationTracker.lat,
      longitude:this.locationTracker.lng,
      eid:this.eid,
      name:this.name,
      process:1
    }
    this.service.trackemp(data).then((data:any)=>{
      if(data.statuscode==1){
        console.log("track",data.msg)
      }else{
        console.log("failed",data.msg);
      }
    })

  }

  stop(){
    this.locationTracker.stopTracking();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.index==9){
      const alert = this.alertCtrl.create({
        title: "hey!!!", 
        subTitle: 'Are you sure want to logout?',
        buttons: [ {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'yes',
          handler: () => {
            // this.storage.set('email',"");
            // this.storage.set('utype',"");
            this.stop();
            this.storage.set('eid',"");
            this.storage.set('name',"");
            this.storage.set('logintype',"");
            this.storage.set('emptype',"");
            this.nav.setRoot(page.component);
           // this.nav.popToRoot();
            
          }
        }]
      });
      alert.present();
    }else if(page.index==0){
    this.nav.setRoot(page.component);
    }
    else{
      this.nav.push(page.component);
    }
  }
}
