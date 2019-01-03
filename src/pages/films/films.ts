import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Medias } from "../../models/medias";
import { OmdbLinkProvider } from "../../providers/omdb-link/omdb-link";

@IonicPage()
@Component({
  selector: 'page-films',
  templateUrl: 'films.html'
})

export class FilmsPage extends Medias {
  public type: string = "movie";

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiOmdb: OmdbLinkProvider) {
    super(apiOmdb);
  }

  public filmsDetails(title: string) {
    this.navCtrl.push('film-details', {
      'title': title
    });
  }
}
