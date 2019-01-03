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

  public filmsDetails(movie) {
    new Promise((resolve) => {
      this.apiOmdb.getMediasDetailToAPI(movie.imdbID).then(data => {
        console.log(data);
        if(data) {
          resolve(data);
        }
      });
    }).then(
    (movie) => {
      this.getPoster(movie).then(
        (movie) => {
          this.navCtrl.push('film-details', {
           'movie': movie
          });
        }
      );
    });
  }
}
