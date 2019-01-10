import { OmdbLinkProvider } from "../providers/omdb-link/omdb-link";
import { StorageProvider } from "../providers/storage/storage";

export abstract class Medias {

  public abstract type: string;
  protected medias: Object[] = [];
  protected title: string;
  protected year: string;
  protected page: number;
  protected nbOfPage: number;
  protected nbOfResult: number;

  protected constructor(public apiOmdb: OmdbLinkProvider, public storage: StorageProvider) {}

  public getMedias() {
    this.medias = [];
    this.page = 1;
    this.apiOmdb.getMediasToAPI(this.type, this.title, this.year, this.page).then(data => {
      if(data["Search"]) {
        for (let media of data["Search"]) {
          if(media.imdbID) {
            this.getPoster(media).then(
              (media) => {
                this.storage.checkInKey("favories", media["imdbID"]).then (
                  (inArray) => {
                    if(inArray) {
                      media["starType"] = true;
                    }
                    this.medias.push(media);
                    this.medias.sort(this.sort);
                  }
                );
              }
            );
          }
        }
        this.nbOfResult = data["totalResults"];
        this.nbOfPage = Math.trunc(this.nbOfResult / 10 + 1);
      }
    });
  }

  public getPoster(media) {
    return new Promise((resolve) => {
      this.apiOmdb.getPosterToApi(media.imdbID)
        .catch((e) => {
          if (e.status === 200) {
            media.Poster = e.url;
          }
          else if(e.status === 404 && media.Poster === "N/A") {
            media.Poster = "https://cdn.amctheatres.com/Media/Default/Images/noposter.jpg";
          }
          resolve(media);
        });
    });
  }

  public addMedias() {
    this.apiOmdb.getMediasToAPI(this.type, this.title, this.year, this.page).then(data => {
      if(data["Search"]) {
        for (let media of data["Search"]) {
          if(media.imdbID) {
            this.getPoster(media).then(
              (media) => {
                this.medias.push(media);
              }
            );
          }
        }
      }
    }).catch(e => {
      console.log("Error ", e);
    });
  }

  public newPage() {
    this.page++;
    this.addMedias();
  }

  public sort(a, b) {
    if(a.Year > b.Year) {
      return -1;
    }
    else if(a.Year < b.Year) {
      return 1;
    }
    return 0;
  }

  public addFavories(media) {
    this.storage.saveInArray("favories", media.imdbID).then(() => {
        media["starType"] = true;
      }
    );
  }

  public removeFavories(media) {
    this.storage.removeInArray("favories", media.imdbID).then(() => {
        media["starType"] = false;
    });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.newPage();
      infiniteScroll.complete();
      if(this.page >= this.nbOfPage) {
        infiniteScroll.enable(false);
      }
    }, 500);
  }

  ionViewDidLeave() {
    this.title = "";
    this.medias = [];
  }

}
