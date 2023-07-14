import { environment } from './../../environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
apiKey: string = environment.API_KEY;


  constructor(
    private http: HttpClient
  ) {}

  getGames(searchQuery: string): Observable<any> {
    console.log(this.apiKey);
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('search', searchQuery);

    return this.http.get(`https://api.rawg.io/api/games?${params}`);
  }
}
