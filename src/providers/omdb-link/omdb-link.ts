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
  private readonly URL_KEY: string = "?apikey=" + this.KEY + "&i=" + this.ID;

  private readonly URL_OMDB: string = "http://www.omdbapi.com" + this.URL_KEY;

  constructor(public http: HttpClient) {}

  public getFilms(title: string, year: string, page: number) {
    return this.http.get(this.URL_OMDB + "&s=" + title + "&y=" + year + "&page=" + page.toString()).toPromise();
  };

}
