import { Component, OnInit } from '@angular/core';
import { HomepageService } from 'src/app/services/homepage/homepage.service';
import { AuthService } from '../../services/login/login.service'
import { UserinfoService } from 'src/app/services/userinfo/userinfo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  searchQuery!: string;
  games!: any[];
  genre!: string;
  genres!: any[] 
  platform!: string;
  platforms!: any[];
  userInfo: any;
  user: any 
  users = { 
          avatar:'',
          pseudo: '',
          email: '',
          collection: [
            {
              background_image: '',
            }
          ],
         };

collection: any[] = []; 

isFavorited : { [gameId: string]: boolean } = {};;


  constructor(
    private homepageService: HomepageService,
    private authService: AuthService,
    private userinfo: UserinfoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  // Retrieve favorited game IDs from local storage
  const favoritedGameIds: string[] = JSON.parse(localStorage.getItem('favoritedGameIds') ?? '[]');
  
  // Initialize isFavorited object based on stored game IDs
  this.isFavorited = {};
  favoritedGameIds.forEach((id: string) => {
    this.isFavorited[id] = true;
  });
  
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      console.log(this.user.uid);
      this.userinfo.getUserData(this.user?.uid).subscribe((userData) => {
        this.userInfo = userData.data();
        console.log(this.userInfo);
      });
    });
    this.homepageService.getGenres().subscribe((response: any) => {
      this.genres = response.results;
      console.log(this.genres);
    });
    this.homepageService.getPlatforms().subscribe((response: any) => {
      this.platforms = response.results;
      console.log(this.platforms);
    });


  }

  searchGames(): void {
    this.homepageService.getGames(this.searchQuery)
      .subscribe((response: any) => {
        this.games = response.results;
        console.log(this.games);
        
      });
  }

  logout() {
    this.authService.logout();
  }

  gamesByPlatform(platform: string): void {
    this.homepageService.getGamesByPlatform(platform)
      .subscribe((response: any) => {
        this.games = response.results;
        console.log(this.games);
      });
  }
  gamesByPopularity(): void {
    this.homepageService.getGamesByPopularity()
      .subscribe((response: any) => {
        this.games = response.results;
        console.log(this.games);
      });
  }
  gamesByRating(): void {
    this.homepageService.getGamesByRating()
      .subscribe((response: any) => {
        this.games = response.results;
        console.log(this.games);
      });
  }
      
  getGenres(): void {
    this.homepageService.getGenres()
      .subscribe((response: any) => {
        this.genres = response.results;
        console.log(this.genres);
      });
  }
  getGameByGenre(genre: string): void {
    this.homepageService.getGamesByGenre(genre)
      .subscribe((response: any) => {
        this.games = response.results;
        console.log(this.games);
      });
  }
  getGameByPlatform(platform: string): void {
    this.homepageService.getGamesByPlatform(platform)
      .subscribe((response: any) => {
        this.games = response.results;
        console.log(this.games);
      });
  }
  redirectToDashboard() {
    this.router.navigate(['/dashboard']); 
  }


  toggleFavorite(game: any) {
    const gameId = game.id;
    console.log(gameId)
    this.isFavorited[gameId] = !this.isFavorited[gameId];
    console.log(this.isFavorited);
  
     // Update local storage with the favorited game IDs
    const favoritedGameIds = Object.keys(this.isFavorited).filter(id => this.isFavorited[id]);
    localStorage.setItem('favoritedGameIds', JSON.stringify(favoritedGameIds));

    this.collection = this.userInfo.collection;
  
    if (this.isFavorited[gameId]) {
      // If the game is favorited, add it to the collection
      this.collection.push(game.short_screenshots[0]?.image);
    } else {
      // If the game is unfavorited, remove it from the collection
      const gameIndex = this.collection.indexOf(game.short_screenshots[0]?.image);
      if (gameIndex !== -1) {
        this.collection.splice(gameIndex, 1);
      }
    }
  
    console.log(this.collection);
    return this.homepageService.updateFavorite(this.collection);
  }
  



}
