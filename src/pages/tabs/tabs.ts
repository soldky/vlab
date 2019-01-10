import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { FilmsPage } from '../films/films';
import { SeriesPage } from '../series/series';
import { FavoriesPage } from '../favories/favories';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {
  filmsPage = FilmsPage;
  seriesPage = SeriesPage;
  favoriesPage = FavoriesPage;
}
