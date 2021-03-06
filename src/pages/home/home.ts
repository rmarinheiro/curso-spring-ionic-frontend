import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciasDTO } from '../../models/credencias.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciasDTO = {
    email : "",
    senha : ""
  };

  constructor(public navCtrl: NavController,public menu:MenuController, public auth:AuthService) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
    .subscribe(response =>{
     // console.log(response.headers.get('Authorization'));
     this.auth.sucessfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error =>{
      // console.log(error);
     });
   }


  

  login(){
    this.auth.authenticate(this.creds)
    .subscribe(response =>{
     // console.log(response.headers.get('Authorization'));
     this.auth.sucessfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error =>{
      // console.log(error);
     });
   }

   signup(){
     this.navCtrl.push('SignupPage')
   }

}
