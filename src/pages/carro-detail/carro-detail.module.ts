import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarroDetailPage } from './carro-detail';

@NgModule({
  declarations: [
    CarroDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CarroDetailPage),
  ],
})
export class CarroDetailPageModule {}
