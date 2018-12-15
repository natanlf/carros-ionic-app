import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from '../../../node_modules/ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  ionViewWillEnter() { //quando for entrar na página acesso o menu e o desabilito    
    this.menu.swipeEnable(false);   
  } 
 
  ionViewDidLeave() {    //quando sair da página, volta com o menu 
    this.menu.swipeEnable(true);   
  }

  login(){
    this.navCtrl.setRoot('CategoriasPage');
  }

}
