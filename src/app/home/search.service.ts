import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AlbumResults } from '../shared/models/AlbumResults';


interface AccessToken {
  access_token: string;
}


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private clientId: string = environment.clientId;
  private clientSecret: string = environment.clientSecret;
  private rootUrl: string = 'https://api.spotify.com';
  private albumsUrl: string;

  constructor(private http: HttpClient) { }


  // getAuth() will run once the user reaches the Home Component... 
  // will eventually change to once the user signs in, getAuth() will run to allow access to Spotify
  getAuth() {

    let headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(this.clientId + ":" + this.clientSecret))
      .set('Content-Type', 'application/x-www-form-urlencoded');

    let params: HttpParams = new HttpParams()
      .set('grant_type', 'client_credentials');
    let body = params.toString();

    return this.http.post<AccessToken>('https://accounts.spotify.com/api/token', 
      body, 
      { headers: headers });
  }


  searchMusic(query: string, type = 'artist', authToken: string) {
    if (!query) { // This will handle the cases of an empty string within the input. Will return an empty observable.
      return of({});
    }
    
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + authToken);

    let searchUrl = `${this.rootUrl}/v1/search?query=` + query + '&offset=0&limit=20&type=' + type + '&market=US';

    return this.http.get(searchUrl, { headers: headers })
      .pipe(
        catchError(err => {
          return err
        })
      );
  }

  getAlbums(id: string, authToken: string) {
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + authToken);

    this.albumsUrl = `${this.rootUrl}/v1/artists/` + id + '/albums?limit=30';

    return this.http.get<AlbumResults>(this.albumsUrl, { headers: headers });
  }


  // private artistUrl: string;

  // getArtist(id: string, authToken: string) {
  //   let headers = new HttpHeaders()
  //     .set('Authorization', 'Bearer ' + authToken);

  //   this.artistUrl = `${this.rootUrl}/v1/artists/` + id;

  //   return this.http.get(this.artistUrl, { headers: headers });
  // }

}
