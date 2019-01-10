import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OmdbLinkProvider } from "../../providers/omdb-link/omdb-link";

/**
 * Generated class for the SeasonDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'season-details',
  segment: 'serie/season/:season',
  defaultHistory: ['list']
})
@Component({
  selector: 'page-season-details',
  templateUrl: 'season-details.html',
})
export class SeasonDetailsPage {

  protected season;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiOmdb: OmdbLinkProvider) {
    this.season = this.navParams.get('season');
  }

  public episodeDetails(episode) {
    new Promise((resolve) => {
      this.apiOmdb.getEpisodeDetails(episode.imdbID).then(data => {
        resolve(data);
      });
    }).then(
    (episode) => {
      this.navCtrl.push('episode-details', {
        'episode': episode
      });
    });
  }

}
