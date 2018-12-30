import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/domain/cliente.service';
import { MenuController } from '../../../node_modules/ionic-angular/components/app/menu-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public clienteService: ClienteService,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public loadingCtrl: LoadingController) {

      this.formGroup = this.formBuilder.group(
        {
          nome: ['Fernanda Assis', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
          email: ['fernanda@natancode.com', [Validators.required, Validators.email]],
          cpf: ['35032649732', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
          senha: ['123456', [Validators.required, Validators.minLength(6)]],
          telefone1: ['2139856180', [Validators.required, Validators.minLength(8)]],
          telefone2: ['', []],
          telefone3: ['', []]
        }
      )
  }

  ionViewWillEnter() { //quando for entrar na página acesso o menu e o desabilito    
    this.menu.swipeEnable(false);  
  } 
 
  ionViewDidLeave() {    //quando sair da página, volta com o menu 
    this.menu.swipeEnable(true);   
  }

  ionViewDidLoad() {
    this.menu.swipeEnable(true);   
  }

  signupUser() {
    let loader = this.presentLoading(); //chamo o loader
    this.clienteService.insert(this.formGroup.value)
    .subscribe(
      respone => {
        loader.dismiss()
        this.showInsertOK()
      }, error=>{
        loader.dismiss()
      }
    )
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
            this.navCtrl.pop(); //desempilhar essa página
          }
        }
      ] 
    });
    alert.present(); //apresenta o alert na tela
  }

  back(){
    this.navCtrl.pop()
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }
}
