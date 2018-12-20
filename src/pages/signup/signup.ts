import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    public formBuilder: FormBuilder) {

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser() {
    console.log("enviou o form");
  }
}
