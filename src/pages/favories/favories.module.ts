import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoriesPage } from './favories';

@NgModule({
  declarations: [
    FavoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoriesPage),
  ],
})
export class FavoriesPageModule {}
