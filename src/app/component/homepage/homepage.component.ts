import { Component, OnInit } from '@angular/core';
import { HomepageService } from 'src/app/services/homepage/homepage.service';
import { AuthService } from '../../services/login.service'

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



  constructor(
    private homepageService: HomepageService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
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
  
}
