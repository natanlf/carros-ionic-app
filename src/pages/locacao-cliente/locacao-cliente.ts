import { LocacaoService } from './../../services/domain/locacao.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LocacaoClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locacao-cliente',
  templateUrl: 'locacao-cliente.html',
})
export class LocacaoClientePage {

  items
  page: number = 0

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private locacaoService: LocacaoService) {
  }

  ionViewDidLoad() {
    this.locacaoService.findByCliente(this.page)
    .subscribe(response=>{
      this.items = response['content']
      console.log(this.items)
      },error=>{})
  }

}
