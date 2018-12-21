import { AuthService } from './../../services/auth.service';
import { CredeciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from '../../../node_modules/ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredeciaisDTO = {
    email: '',
    senha: ''
  }

  constructor(public navCtrl: NavController, 
              public menu: MenuController, 
              private authService: AuthService) {

  }

  ionViewWillEnter() { //quando for entrar na página acesso o menu e o desabilito    
    this.menu.swipeEnable(false);   
  } 
 
  ionViewDidLeave() {    //quando sair da página, volta com o menu 
    this.menu.swipeEnable(false);   
  }

  login(){
    this.authService.authenticate(this.creds)
    .subscribe(response=>{
      this.authService.successfulLogin(response.headers.get('Authorization'))
      this.navCtrl.setRoot('CategoriasPage');
    }, error=>{})
    
  }

  ionViewDidEnter() {
    this.authService.refreshToken()
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {});  
  }

  signup(){
    this.navCtrl.push('SignupPage')
  }

}
