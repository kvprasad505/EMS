import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  public data:any;
  public URL="http://localhost/attendanceAPI/";

  constructor(public http: HttpClient) {
    console.log('Hello ServiceProvider Provider');
  }

  postData(url,data){
    var header = { "headers": {"Content-Type": "application/json"} };
    return new Promise(resolve =>{
      this.http.post(url,data,header).subscribe(data =>  {
        this.data=data;
        resolve(this.data);
      },error=> {
        console.log("sorry...");
      });
    });
  }

  getdata(url){
    var header = { "headers": {"Content-Type": "application/json"} };
    return new Promise(resolve => {
      this.http.get(url,header).subscribe(data => {
        this.data=data;
        resolve(this.data);
      }, err => {
        console.log("sorry");
      });
    });
} 

  login(data){
  var url = this.URL+"login.php";
  console.log("sending data",JSON.stringify(data));
  return this.postData(url,data);
  }

  addemployee(data){
    var url = this.URL+"addemployee.php";
    console.log("data sending",JSON.stringify(data));
    return this.postData(url,data);
  }

  todayattendance(data){
    var url = this.URL+"todayattendance.php";
    console.log("data sending",JSON.stringify(data));
    return this.postData(url,data);
  }

    clockin(data){
    var url = this.URL+"clockin.php";
    console.log("data sending",JSON.stringify(data));
    return this.postData(url,data);
  }

  clockout(data){
    var url = this.URL+"clockout.php";
    console.log("data sending",JSON.stringify(data));
    return this.postData(url,data);
  }

  clockstatus(data){
    var url = this.URL+"clockstatus.php";
    console.log("data sending",JSON.stringify(data));
    return this.postData(url,data);
  }

  totalattendance(data){
    var url = this.URL+"totalattendance.php";
    console.log("data sending",JSON.stringify(data));
    return this.postData(url,data);
  }

  addsite(data){
    var url = this.URL+"addsite.php";
    console.log("data sending",JSON.stringify(data));
    return this.postData(url,data);
  }

  assignsite(){
    var url = this.URL+"assignsite.php";
    //console.log("data sending",JSON.stringify(data));
    return this.getdata(url);
  }

  assignsite2(data){
    var url = this.URL+"assignsite.php";
    console.log("data sending",JSON.stringify(data));
    return this.postData(url,data);
  }

  changepassword(data){
    var url = this.URL+"changepassword.php";
    console.log("data sending",JSON.stringify(data));
    return this.postData(url,data);
  }

  getassignedsites(data){
    var url = this.URL+"assignedsites.php";
    console.log("data sending",JSON.stringify(data));
    return this.postData(url,data);
  }

  getsitedetails(data){
    var url = this.URL+"sitedetails.php";
    console.log("data sending",JSON.stringify(data));
    return this.postData(url,data);
  }

  employeelist(){
    var url = this.URL+"employeelist.php";
    //console.log("data sending",JSON.stringify(data));
    return this.getdata(url);
  }

  updateemployee(data){
    var url = this.URL+"employeelist.php";
    console.log("data sending",JSON.stringify(data));
    return this.postData(url,data);
  }

  trackemp(data){
    var url = this.URL+"trackemp.php";
    console.log("tracking data sending",JSON.stringify(data));
    return this.postData(url,data);
  }
}