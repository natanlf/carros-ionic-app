import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocacaoPage } from './locacao';

@NgModule({
  declarations: [
    LocacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(LocacaoPage),
  ],
})
export class LocacaoPageModule {}
