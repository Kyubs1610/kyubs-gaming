import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../login/login.service';
import { UserinfoService } from '../userinfo/userinfo.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
apiKey: string = environment.API_KEY;
genre!: string;
user: any;
userInfo: any;
games!: any[];
collection: any;

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private authService: AuthService,
    private userinfo: UserinfoService,
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.userinfo.getUserData(this.user?.uid).subscribe((userData) => {
        this.userInfo = userData.data();
      this.games = this.userInfo.collection;
      });
    });
  }
  getGames(searchQuery: string): Observable<any> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('search', searchQuery)
      .set('search_precise', 'true')
      .set('ordering', '-search_exact'); 
  
    return this.http.get(`https://api.rawg.io/api/games?${params}`)
    .pipe(
      map((response: any) => {
        // Filter out games with null Metacritic scores
        const filteredResults = response.results.filter((game: any) => game.rating !== null);
        return { ...response, results: filteredResults };
      })
    );
  }

  getGenres(): Observable<any> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set ('ordering', '-metacritic');
    return this.http.get(`https://api.rawg.io/api/genres?${params}`);
  }

  getGamesByGenre(genre: string): Observable<any> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('genres', genre)
      .set('metacritic', '1,100')
      .set ('ordering', '-metacritic');
    return this.http.get(`https://api.rawg.io/api/games?${params}`);
}

getPlatforms(): Observable<any> {
  const params = new HttpParams()
    .set('key', this.apiKey)
    .set ('ordering', '-metacritic');
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
  return this.http.get(`https://api.rawg.io/api/games?${params}`);
}

getGamesByRating(): Observable<any> {
  const params = new HttpParams()
    .set('key', this.apiKey)
    .set('search', '')
    .set('page_size', '40')
    .set('metacritic', '1,100')
    .set ('ordering', '-rating');
return this.http.get(`https://api.rawg.io/api/games?${params}`)
}

updateFavorite(collection: any) {
  return this.fireauth.currentUser.then((user) => {
    if (user) {
      return this.firestore.collection('userInfo').doc(user.uid).update({ collection: collection });
      
    } else {
      return Promise.resolve(); 
    }
  });
}
deleteFavorite(games: any) {
  return this.fireauth.currentUser.then((user) => {
    if (user) {
      const userUid = user.uid;
      return this.firestore.collection('userInfo').doc(userUid).update({ collection: games });
    } else {
      return Promise.resolve(); // Return an empty promise if the user is not logged in
    }
  });
}
}

