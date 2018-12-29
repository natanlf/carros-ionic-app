import { CarroService } from './../../services/domain/carro.service';
import { LocacaoService } from './../../services/domain/locacao.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

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
    private locacaoService: LocacaoService,
    private carroService: CarroService) {
  }

  ionViewDidLoad() {
    this.locacaoService.findByCliente(this.page)
    .subscribe(response=>{
      this.items = response['content']
      this.loadImageUrls()
      console.log(this.items)
      },error=>{})
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.carroService.getImageFromBucket(item.carro.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/car${item.carro.id}.jpg`;
        },
        error => {});
    }
  }  

}
