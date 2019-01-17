import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from "../../providers/storage/storage";
import { OmdbLinkProvider } from "../../providers/omdb-link/omdb-link";
import { File } from '@ionic-native/file';
//import * as json2csv from 'json-2-csv';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public apiOmdb: OmdbLinkProvider, public file: File) {}

  public ionViewWillEnter() {
    this.favories = [];
    this.storage.get("favories").then((favories) => {
      if(favories != null) {
        favories.forEach((favorite) => {
          this.apiOmdb.getMediasDetailToAPI(favorite).then((media) => {
            this.favories.push(media);
            this.favories.sort(this.sort);
          });
        });
      };
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
            this.favories.splice(i, 1);
        }
      });
  }

  public exportImport(action: string) {
    if(action === '1') {
      this.file.writeFile(this.file.externalDataDirectory, "favoriesJSON.json", JSON.stringify(this.favories), {replace:true}).then(
        (result) => {
          console.log(JSON.stringify(result));
          alert("Favoris exporté dans le fichier " + this.file.dataDirectory + "favoriesJSON.json");
        },
        (e) => {
          console.log(JSON.stringify(e));
          this.file.writeFile(this.file.dataDirectory, "favoriesJSON.json", JSON.stringify(this.favories), {replace:true}).then(
            (result) => {
            console.log(JSON.stringify(result));
            alert("Favoris exporté dans le fichier " + this.file.dataDirectory + "favoriesJSON.json");
          })
        }
      );
    }

    /*else if(action === '2') {
      let json2csvCallback = function(err, csv) {
        let file: File;
        this.test(csv);
      }

      json2csv.json2csv(this.favories, json2csvCallback);
    }*/

    else if(action === '3') {
      let importFavories;

      this.file.readAsText(this.file.externalDataDirectory, "favoriesJSON.json").then(
        (data) => {
          importFavories = JSON.parse(data);

          this.storage.purge().then(
            () => {
              let save = [];
              for(let i = 0; i < importFavories.length; i++) {
                save.push(importFavories[i].imdbID);
              };
              this.storage.set("favories", save).then(
                () => console.log("save ok")
              );
            })
          this.favories = importFavories;
          alert("Favoris importés");
        },
        (e) => {
          this.file.readAsText(this.file.dataDirectory, "favoriesJSON.json").then(
            (data) => {
              importFavories = JSON.parse(data);

              this.storage.purge().then(
                () => {
                  let save = [];
                  for(let j = 0; j < importFavories.length; j++) {
                    save.push(importFavories[j].imdbID);
                  };
                  this.storage.set("favories", save).then(
                    () => console.log("save ok")
                  );
                })
              this.favories = importFavories;
              alert("Favoris importés");
            }
          );
        }
      );
    }
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
