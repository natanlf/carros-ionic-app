import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[] = []

  constructor(
    private categoriaService: CategoriaService,
    private navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
    .subscribe(response=> { this.items = response },
    error=>{  })
  }

  showCarros(id: string){
    this.navCtrl.push('CarrosPage', {categoria_id: id})
  }

}
