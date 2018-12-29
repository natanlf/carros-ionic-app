import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

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
  profileImage

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: StorageService,
    private clienteService: ClienteService,
    public camera: Camera,
    public sanitizer: DomSanitizer) {
      this.profileImage = 'assets/imgs/avatar-blank.png'
  }

  ionViewDidLoad() {
    this.loadData()
  }

  loadData(){
    let localUser = this.storage.getLocalUser()
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response as ClienteDTO
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

  // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    })
  }

  getImageIfExists() { //se a imagem do usuário existe então a pegamos
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      this.blobToDataURL(response).then(dataUrl => {
        let str : string = dataUrl as string;
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
      });
    },
    error => {
      this.profileImage = 'assets/imgs/avatar-blank.png'
    });
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
    this.cameraOn = false; //caso cancele
   });
 }

  sendPicture() { //fazendo upload da imagem
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null; //como já fiz upload coloco a imagem nulo
        this.getImageIfExists(); //depois que fizer upload foço o carregamento dos dados
      },
      error => {
      });
  }

  cancel() {
    this.picture = null;
  }

  getGalleryPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
     quality: 100,
     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
     destinationType: this.camera.DestinationType.DATA_URL,
     encodingType: this.camera.EncodingType.PNG,
     mediaType: this.camera.MediaType.PICTURE
   }
  
   this.camera.getPicture(options).then((imageData) => {
    this.picture = 'data:image/png;base64,' + imageData;
    this.cameraOn = false;
   }, (err) => {
    this.cameraOn = false; //caso cancele
   });
  }

}
