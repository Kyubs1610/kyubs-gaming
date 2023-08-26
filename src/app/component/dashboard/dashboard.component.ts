import { Component } from '@angular/core';
import { UserinfoService } from 'src/app/services/userinfo/userinfo.service';
import { AuthService } from 'src/app/services/login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { HomepageService } from 'src/app/services/homepage/homepage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  user: any 
  users = { 
          avatar:'',
          pseudo: '',
          email: '',
         };
  userInfo: any;
  games!: any[];
  collection: any[] = []; 

  constructor(private userinfo: UserinfoService,
              private authService: AuthService,
              private dialog: MatDialog,
              private homepageService: HomepageService,
              ) {}

ngOnInit() {
  this.authService.getCurrentUser().subscribe((user) => {
    this.user = user;
    console.log(this.user.uid);
    this.userinfo.getUserData(this.user?.uid).subscribe((userData) => {
      this.userInfo = userData.data();
      console.log(this.userInfo);
    this.games = this.userInfo.collection;
    });
  });
}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: "myClass"
    });
  }

  logout() {
    this.authService.logout();
  }

deleteGame(game: any) {
  this.collection = this.userInfo.collection;
  console.log(this.collection);
  this.collection.splice(this.collection.indexOf(game), 1);
  return this.homepageService.deleteFavorite(this.collection);

}
}
