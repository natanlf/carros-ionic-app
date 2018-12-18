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

  constructor(private categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
    .subscribe(response=> { console.log(response) },
    error=>{ console.log(error) })
  }

}
