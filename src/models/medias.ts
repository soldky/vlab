import { OmdbLinkProvider } from "../providers/omdb-link/omdb-link";

export abstract class Medias {

  public abstract type: string;
  protected medias: Object[] = [];
  protected title: string;
  protected year: string;
  protected page: number;
  protected nbOfPage: number;

  protected constructor(public apiOmdb: OmdbLinkProvider) {}

  public getMedias() {
    this.medias = [];
    this.page = 1;
    this.apiOmdb.getMediasToAPI(this.type, this.title, this.year, this.page).then(data => {
      if(data["Search"]) {
        console.log(data);
        for (let media of data["Search"]) {
          this.medias.push(media);
        }
        this.nbOfPage = Math.trunc(data["totalResults"] / 10 + 1);
      }
    });
  }

  public addMedias() {
    this.apiOmdb.getMediasToAPI(this.type, this.title, this.year, this.page).then(data => {
      if(data["Search"]) {
        for (let media of data["Search"]) {
          this.medias.push(media);
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
