import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    @ViewChild('username') user;
    @ViewChild('password') password;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  signInUser(){
    
    if(this.user.value == "akhila" && this.password.value == "akhila"){
         let alert = this.alertCtrl.create({
          title: 'Login Successful!',
          subTitle: 'You are logged in as '+this.user.value,
          buttons: ['OK']
        });
        alert.present();
    }else{
         let alert = this.alertCtrl.create({
          title: 'Login unsuccessful!',
          subTitle: 'Username or Password incorrect!!',
          buttons: ['OK']
        });
        alert.present();
    }
    console.log(this.user.value,this.password.value);
  }

}
