import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

/**
 * Generated class for the LocacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locacao',
  templateUrl: 'locacao.html',
})
export class LocacaoPage {

  formGroup: FormGroup;

  dias: number

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        diasPrevistos: [1, Validators.required], //diaria
        desconto: [0.10, Validators.required], //longo periodo
        instanteDevolucao: [null, Validators.required],
        "@type": ["LocacaoLongoPeriodo", Validators.required] //diaria oulongo periodo
        //cliente id
        //carro_id
        //sede_id
      });
  }

  ionViewDidLoad() {
    let carro = this.navParams.get('carro')
    console.log(carro.id)
  }

  saveLocacao(){
    console.log("save locacao")
  }

}
