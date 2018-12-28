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

  items: CarroDTO[] = []
  page: number = 0

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
    this.carroService.findByCategoria(categoria_id, this.page, 5)
    .subscribe(response=>{
      let start = this.items.length
      this.items = this.items.concat(response['content'])
      let end = this.items.length
      loader.dismiss()
      console.log(this.page);
      console.log(this.items);
      this.loadImageUrls(start, end);
    }, error=>{
      loader.dismiss()
    })
  }

  showDetails(id: string){
    this.navCtrl.push('CarroDetailPage', {carro_id: id})
  }

  loadImageUrls(start: number, end: number) {
    for (var i=start; i<end; i++) {
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
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    //toda vez que esse método for chamado significa que queremos buscar mais dados
    //incrementamos a página e pegamos mais dados chamando o loadData
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

}
