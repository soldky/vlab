import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from "../../providers/storage/storage";
import { OmdbLinkProvider } from "../../providers/omdb-link/omdb-link";

/**
 * Generated class for the FavoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favories',
  templateUrl: 'favories.html',
})
export class FavoriesPage {

  protected favories: Object[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public apiOmdb: OmdbLinkProvider) {}

  public ionViewWillEnter() {
    this.favories = [];
    this.storage.get("favories").then((favories) => {
      favories.forEach((favorite) => {
        this.apiOmdb.getMediasDetailToAPI(favorite).then((media) => {
          this.favories.push(media);
          this.favories.sort(this.sort);
        });
      });
    });
  }

  public favoriteDetails(favorite) {
    if(favorite.Type === "movie") {
      this.navCtrl.push('film-details', {
       'movie': favorite
      });
    }
    else if(favorite.Type === "series") {
      new Promise((resolve) => {
        let seasons = [];
        for (let i = 0; i < favorite["totalSeasons"]; i++) {
          seasons[i] = i + 1;
        }
        favorite["totalSeasons"] = seasons;
        resolve(favorite);
      }).then(
      (favorite) => {
        this.navCtrl.push('serie-seasons', {
          'serie': favorite
        });
      });
    }
  }

  public deleteFavorite(favorite) {
    this.storage.removeInArray("favories", favorite.imdbID).then(
      () => {
        for(let i = 0; i < this.favories.length; i++) {
          if(this.favories[i]["imdbID"] === favorite.imdbID) {
            console.log("22");
            this.favories.splice(i, 1);
          }
        }
      });
  }

  private sort(a, b) {
    if (a["Title"] < b["Title"]) {
      return -1;
    }
    else if (a["Title"] > b["Title"]) {
      return 1;
    }
    return 0;
  }
}
