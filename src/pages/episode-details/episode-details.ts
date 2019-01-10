import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EpisodeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'episode-details',
  segment: 'episode/:title',
  defaultHistory: ['list']
})
@Component({
  selector: 'page-episode-details',
  templateUrl: 'episode-details.html',
})
export class EpisodeDetailsPage {

  protected episode;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.episode = this.navParams.get('episode');
    console.log(this.episode);
  }

}
