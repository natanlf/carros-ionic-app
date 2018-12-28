import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: StorageService,
    private clienteService: ClienteService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser()
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response
        this.getImageIfExists();//buscar a imagem
      },
      error => {
        if(error.status==403){ //testando redirect para erro 403
          this.navCtrl.setRoot('HomePage');
        }else{
          this.navCtrl.setRoot('HomePage');
        }
      })
    } 
  }

  getImageIfExists() { //se a imagem do usuário existe então a pegamos
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error => {});
  }

  getCameraPicture() {
    this.cameraOn = true; //após abrir a camera tenho que desabillitar meu botão do html
    const options: CameraOptions = {
     quality: 100,
     destinationType: this.camera.DestinationType.DATA_URL,
     encodingType: this.camera.EncodingType.PNG,
     mediaType: this.camera.MediaType.PICTURE
   }

   this.camera.getPicture(options).then((imageData) => { //quando chegar a resposta grava como base 64
    this.picture = 'data:image/png;base64,' + imageData;
    this.cameraOn = false; 
   }, (err) => {
   });
 }

}
