import { CarroService } from './../../services/domain/carro.service';
import { CarroDTO } from './../../models/carro.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

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
    private carroService: CarroService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData()
  }

  loadData(){
    let categoria_id = this.navParams.get('categoria_id')
    let loader = this.presentLoading(); //chamo o loader
    this.carroService.findByCategoria(categoria_id)
    .subscribe(response=>{
      this.items = response['content']
      loader.dismiss()
      this.loadImageUrls();
    }, error=>{
      loader.dismiss()
    })
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

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
