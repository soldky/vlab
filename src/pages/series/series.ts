import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Medias } from "../../models/medias";
import { OmdbLinkProvider } from "../../providers/omdb-link/omdb-link";

@IonicPage()
@Component({
  selector: 'page-series',
  templateUrl: 'series.html'
})

export class SeriesPage extends Medias {
  public type: string = "series";

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiOmdb: OmdbLinkProvider) {
    super(apiOmdb);
  }
}
