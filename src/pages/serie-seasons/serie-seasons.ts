import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OmdbLinkProvider } from "../../providers/omdb-link/omdb-link";

/**
 * Generated class for the SerieSeasonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'serie-seasons',
  segment: 'serie/:title',
  defaultHistory: ['list']
})
@Component({
  selector: 'page-serie-seasons',
  templateUrl: 'serie-seasons.html',
})
export class SerieSeasonsPage {

  protected serie;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiOmdb: OmdbLinkProvider) {
    this.serie = this.navParams.get('serie');
  }

  public seasonDetails(season) {
    new Promise((resolve) => {
      this.apiOmdb.getSeasonDetails(this.serie.imdbID, season).then(data => {
        resolve(data);
      });
    }).then(
    (season) => {
      this.navCtrl.push('season-details', {
        'season': season
      });
    });
  }
}
