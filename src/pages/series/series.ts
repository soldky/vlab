import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Medias } from "../../models/medias";
import { OmdbLinkProvider } from "../../providers/omdb-link/omdb-link";
import { StorageProvider } from "../../providers/storage/storage";
import { PhotoLibrary } from '@ionic-native/photo-library';

@IonicPage()
@Component({
  selector: 'page-series',
  templateUrl: 'series.html'
})

export class SeriesPage extends Medias {
  public type: string = "series";

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiOmdb: OmdbLinkProvider, public storage: StorageProvider, public photoLibrary: PhotoLibrary) {
    super(apiOmdb, storage, photoLibrary);
  }

  public seriesDetails(serie) {
    new Promise((resolve) => {
      this.apiOmdb.getMediasDetailToAPI(serie.imdbID).then(data => {
        if (data) {
          let seasons = [];
          for (let i = 0; i < data["totalSeasons"]; i++) {
            seasons[i] = i + 1;
          }
          data["totalSeasons"] = seasons;
          resolve(data);
        }
      });
    }).then(
      (serie) => {
        this.getPoster(serie).then(
          (serie) => {
            this.navCtrl.push('serie-seasons', {
              'serie': serie
            });
          }
        );
      });
  }
}
