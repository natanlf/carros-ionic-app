import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarrosPage } from './carros';

@NgModule({
  declarations: [
    CarrosPage,
  ],
  imports: [
    IonicPageModule.forChild(CarrosPage),
  ],
})
export class CarrosPageModule {}
