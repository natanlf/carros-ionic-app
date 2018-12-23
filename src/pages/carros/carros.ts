import { CarroService } from './../../services/domain/carro.service';
import { CarroDTO } from './../../models/carro.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CarrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carros',
  templateUrl: 'carros.html',
})
export class CarrosPage {

  items: CarroDTO[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private carroService: CarroService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id')
    this.carroService.findByCategoria(categoria_id)
    .subscribe(response=>{
      this.items = response['content']
      this.loadImageUrls();
    }, error=>{})
  }

  showDetails(id: string){
    this.navCtrl.push('CarroDetailPage', {carro_id: id})
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.carroService.getImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/car${item.id}.jpg`;
        },
        error => {});
    }
  }  

}
