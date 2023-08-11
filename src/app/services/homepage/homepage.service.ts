import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomepageService {
apiKey: string = environment.API_KEY;
genre!: string;

  constructor(
    private http: HttpClient,

  ) {}

  getGames(searchQuery: string): Observable<any> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('search', searchQuery)
      .set('search_precise', 'true')
      .set('metacritic', '1,100')
      .set ('ordering', '-metacritic');
    console.log(params);
    return this.http.get(`https://api.rawg.io/api/games?${params}`);
  }

  getGenres(): Observable<any> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set ('ordering', '-metacritic');
    console.log(params);
    return this.http.get(`https://api.rawg.io/api/genres?${params}`);
  }

  getGamesByGenre(genre: string): Observable<any> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('genres', genre)
      .set('metacritic', '1,100')
      .set ('ordering', '-metacritic');
      console.log(genre)
    return this.http.get(`https://api.rawg.io/api/games?${params}`);
}

getPlatforms(): Observable<any> {
  const params = new HttpParams()
    .set('key', this.apiKey)
    .set ('ordering', '-metacritic');
  console.log(params);
  return this.http.get(`https://api.rawg.io/api/platforms?${params}`);
}

getGamesByPlatform(platform: string): Observable<any> {
  const params = new HttpParams()
    .set('key', this.apiKey)
    .set('platforms', platform)
    .set ('ordering', '-metacritic');

  return this.http.get(`https://api.rawg.io/api/games?${params}`);
}

getGamesByPopularity(): Observable<any> {
  const params = new HttpParams()
    .set('key', this.apiKey)
    .set('search', '')
    .set('metacritic', '90,100')
    .set('page_size', '40')
    .set ('ordering', '-metacritic');
console.log(params);
  return this.http.get(`https://api.rawg.io/api/games?${params}`);
}

getGamesByRating(): Observable<any> {
  const params = new HttpParams()
    .set('key', this.apiKey)
    .set('search', '')
    .set('page_size', '40')
    .set('metacritic', '1,100')
    .set ('ordering', '-rating');
console.log(params);
return this.http.get(`https://api.rawg.io/api/games?${params}`)
}


}

