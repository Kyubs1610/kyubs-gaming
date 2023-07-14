import { Component } from '@angular/core';
import { HomepageService } from 'src/app/services/homepage.service';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  searchQuery!: string;
  games!: any[];

  constructor(
    private homepageService: HomepageService
  ) { }

  searchGames(): void {
    this.homepageService.getGames(this.searchQuery)
      .subscribe((response: any) => {
        this.games = response.results;
        console.log(this.games);

      });
  }
}
