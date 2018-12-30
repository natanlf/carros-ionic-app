import { LocacaoService } from './../../services/domain/locacao.service';
import { StorageService } from './../../services/storage.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

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
  total: number = 0
  diffDays: number

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private storage: StorageService,
    private locacaoService: LocacaoService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

      this.formGroup = this.formBuilder.group({
        diasPrevistos: [1, Validators.required], //diaria
        desconto: [0, Validators.required], //longo periodo
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

    if(localUser && localUser.email){
      
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response=>{
        localStorage.setItem("clienteId", response.id.toString())
      },error=>{
        if(error.status==403){ //testando redirect para erro 403
          this.navCtrl.setRoot('HomePage');
        }else{
          this.navCtrl.setRoot('HomePage');
        }
      })
    }

    this.formGroup.controls.cliente.setValue({id: parseInt(localStorage.getItem("clienteId"))});
  }

  saveLocacao(){
    let values = this.formGroup.value
    this.diffDays = this.diasAluguel()
    let precoDiaria: number = this.carro.categoria.valorDiario
    this.formGroup.controls.diasPrevistos.setValue(this.diffDays)

    if(values['@type']==="LocacaoLongoPeriodo"){ 
      
      if(this.diffDays>7 && this.diffDays<14){
        //10% de desconto
        this.formGroup.controls.desconto.setValue(0.10);
      }else if(this.diffDays>=14 && this.diffDays<21){
        //15% de desconto
        this.formGroup.controls.desconto.setValue(0.15);
      }else if(this.diffDays>=21){
        //20% de desconto
        this.formGroup.controls.desconto.setValue(0.20);
      }
      let desconto = this.formGroup.controls.desconto.value
      this.total = (this.diffDays * precoDiaria) - (this.diffDays * precoDiaria * desconto)

    }else{
      if(this.formGroup.controls.diasPrevistos.value <= this.diffDays){
        this.total = precoDiaria * this.diasAluguel()
      }   
    }
  
  }

  diasAluguel(): number{ //quantos dias o carro estará alugado
    let today = new Date()
    let devolucao = this.formGroup.controls.instanteDevolucao.value
    let dev = new Date(devolucao)
    dev.setHours(dev.getHours()+3) //por causa da timezone adiciono 3 horas

    //Pego a diferença em dias 
    let diff = Math.abs(dev.getTime() - today.getTime())
    let diffDays = Math.ceil(diff/(1000 * 3600 * 24))
    return diffDays
  }

  saveLocacaoDB(){
    let loader = this.presentLoading(); //chamo o loader
    this.locacaoService.insert(this.formGroup.value)
    .subscribe(response=>{
      loader.dismiss()
      this.showInsertOK()
    },error=>{
      loader.dismiss()
    })
  }

  showInsertOK(){
    let alert = this.alertCtrl.create({
      title: "Sucesso!",
      message: "Cadastro efetuado com sucesso",
      enableBackdropDismiss: false,
      buttons:[
        {
          text: "OK",
          handler: () => {
            this.navCtrl.setRoot('HomePage'); //desempilhar essa página
          }
        }
      ] 
    });
    alert.present(); //apresenta o alert na tela
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
