import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the OmdbLinkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OmdbLinkProvider {

  // CONSTANTES
  private readonly KEY: string = "75522b56";
  private readonly ID: string = "tt3896198";
  private readonly URL_KEY: string = "?apikey=" + this.KEY;

  private readonly URL_OMDB: string = "http://www.omdbapi.com" + this.URL_KEY + "&i=" + this.ID;
  private readonly URL_POSTER: string = "http://img.omdbapi.com" + this.URL_KEY + "&h=1080";
  private readonly URL_WITHOUT_ID: string = "http://www.omdbapi.com" + this.URL_KEY;

  constructor(public http: HttpClient) {}

  public getMediasToAPI(type: string, title: string, year: string, page: number) {
    return this.http.get(this.URL_OMDB + "&type=" + type + "&s=" + title + "&y=" + year + "&page=" + page.toString()).toPromise();
  };

  public getMediasDetailToAPI(id: string) {
    return this.http.get(this.URL_WITHOUT_ID + "&i=" + id + "&plot=full").toPromise();
  };

  public getPosterToApi(id: string) {
    return this.http.get(this.URL_POSTER + "&i=" + id).toPromise();
  }

  public getSeasonDetails(id: string, season: number) {
    return this.http.get(this.URL_WITHOUT_ID + "&i=" + id + "&plot=full&Season=" + season.toString()).toPromise();
  }

  public getEpisodeDetails(id: string) {
    return this.http.get(this.URL_WITHOUT_ID + "&i=" + id + "&plot=full").toPromise();
  }

}
