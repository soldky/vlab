import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SerieSeasonsPage } from './serie-seasons';

@NgModule({
  declarations: [
    SerieSeasonsPage,
  ],
  imports: [
    IonicPageModule.forChild(SerieSeasonsPage),
  ],
})
export class SerieSeasonsPageModule {}
