import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocacaoClientePage } from './locacao-cliente';

@NgModule({
  declarations: [
    LocacaoClientePage,
  ],
  imports: [
    IonicPageModule.forChild(LocacaoClientePage),
  ],
})
export class LocacaoClientePageModule {}
