import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OmdbLinkProvider } from "../../providers/omdb-link/omdb-link";

/**
 * Generated class for the FilmDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'film-details',
  segment: 'film/:titlz',
  defaultHistory: ['list']
})
@Component({
  selector: 'page-film-details',
  templateUrl: 'film-details.html',
})
export class FilmDetailsPage {

  protected movie = null;
  protected genres: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiOmdb: OmdbLinkProvider) {
    this.movie = this.navParams.get('movie');
    console.log(this.movie);
  }

}
