import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { OmdbLinkProvider } from '../providers/omdb-link/omdb-link';
import { HttpClientModule } from '@angular/common/http';
import { FilmsPage } from '../pages/films/films';
import { SeriesPage } from '../pages/series/series';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    FilmsPage,
    SeriesPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    FilmsPage,
    SeriesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OmdbLinkProvider
  ]
})
export class AppModule {}
