import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient, public storage: Storage) {}

  public saveInArray(key: string, value: string) {
    return new Promise((resolve, reject) => {
      this.get(key).then((val) => {
        if (!val) {
          val = [];
        }
        val.push(value);

        this.set(key, val).then(() => {
          resolve();
        });
      });
    });
  }

  public removeInArray(key: string, value: string) {
    return new Promise((resolve) => {
      this.get(key).then((val) => {
        for(let i = 0; i < val.length; i++) {
          if(val[i] === value) {
            val.splice(i, 1);
            this.set("favories", val).then(() => {
              resolve();
            });
          }
        }
        resolve();
      });
    });
  }

  public checkInKey(key: string, id: string) {
    return new Promise((resolve, reject) => {
      this.get(key).then((val) => {
        if(val != null) {
          if (val.indexOf(id) < 0) {
            resolve(false);
          }
          else {
            resolve(true);
          }
        }
      });
    })
  }

  public purge() {
    return new Promise((resolve) => {
      resolve(this.set("favories", []));
    });
  }

  public set(key, value) {
    return this.storage.set(key, value);
  }

  public get(key) {
    return this.storage.get(key);
  }

}
