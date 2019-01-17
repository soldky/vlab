import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { OmdbLinkProvider } from '../providers/omdb-link/omdb-link';
import { HttpClientModule } from '@angular/common/http';
import { FilmsPage } from '../pages/films/films';
import { SeriesPage } from '../pages/series/series';
import { FavoriesPage } from '../pages/favories/favories';
import { StorageProvider } from '../providers/storage/storage';
import { File } from '@ionic-native/file';
import { PhotoLibrary } from '@ionic-native/photo-library';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    FilmsPage,
    SeriesPage,
    FavoriesPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    FilmsPage,
    SeriesPage,
    FavoriesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OmdbLinkProvider,
    StorageProvider,
    File,
    PhotoLibrary
  ]
})
export class AppModule {}
