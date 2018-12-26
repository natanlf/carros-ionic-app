import { StorageService } from './../../services/storage.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  carro: any
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private storage: StorageService) {

      this.formGroup = this.formBuilder.group({
        diasPrevistos: [1, Validators.required], //diaria
        desconto: [0.10, Validators.required], //longo periodo
        instanteDevolucao: [null, Validators.required],
        "@type": ["LocacaoLongoPeriodo", Validators.required], //diaria oulongo periodo
        cliente: {id: 6},  //cliente id
        carro: {id: 1}, //carro_id
        sede: {id: 1}//sede_id
      });
  }

  ionViewDidLoad() {
    this.carro = this.navParams.get('carro');
    this.formGroup.controls.carro.setValue({id: this.carro.id});
    this.formGroup.controls.sede.setValue({id: this.carro.sede.id});

    let localUser = this.storage.getLocalUser()
    this.clienteService.findByEmail(localUser.email)
    .subscribe(response=>{
      localStorage.setItem("clienteId", response.id.toString())
      //console.log(this.cli);
    },error=>{})
    console.log(localStorage.getItem("clienteId"));
    console.log(this.carro);
    this.formGroup.controls.cliente.setValue({id: localStorage.getItem("clienteId")});
    console.log(JSON.stringify(this.formGroup.value));
  }

  saveLocacao(){
    console.log("save locacao"+ JSON.stringify(this.formGroup.value))
  }

}
