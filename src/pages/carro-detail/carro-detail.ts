import { CarroService } from './../../services/domain/carro.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CarroDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carro-detail',
  templateUrl: 'carro-detail.html',
})
export class CarroDetailPage {

  item: any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private carroService: CarroService) {
  }

  ionViewDidLoad() {
    let carroId = this.navParams.get('carro_id')
    this.carroService.findById(carroId)
    .subscribe(response=>{
      this.item = response
      this.getImageUrlIfExists()
    }, error=>{})
  }

  getImageUrlIfExists() {
    this.carroService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/car${this.item.id}.jpg`;
      },
      error => {});
    }

    locacao(){
      this.navCtrl.push('LocacaoPage')
    }

}
