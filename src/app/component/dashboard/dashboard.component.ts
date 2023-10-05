import { Component } from '@angular/core';
import { UserinfoService } from 'src/app/services/userinfo/userinfo.service';
import { AuthService } from 'src/app/services/login/login.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomepageService } from 'src/app/services/homepage/homepage.service';
import { DialogfollowerComponent } from '../dialogfollower/dialogfollower.component';
import { DialogComponent } from '../dashboard/dialog/dialog.component';
import { DialogfollowingComponent } from '../dialogfollowing/dialogfollowing.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  user?: any;
  users = { 
          avatar:'',
          pseudo: '',
          email: '',
          followers: [],
          following: [],
         };
  userInfo?: any;
  games!: any[];
  collection?: any
  hasPseudo = !!this.users.pseudo;
  gameId!: number;
  followers!: any[];
  following!: any[];
  userData?: any;
  
  constructor(private userinfo: UserinfoService,
              private authService: AuthService,
              private dialog: MatDialog,
              private homepageService: HomepageService,
              private dialogFollowingComponent: DialogfollowingComponent,
              private dialogfollowerComponent: DialogfollowerComponent,
              private router: Router,

              
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

openDialog(): void {
  const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, {
    width: 'auto',
    data: { users: this.users},
  });

  dialogRef.afterClosed().subscribe(updatedUserData => {
    console.log('The dialog was closed');
    if (updatedUserData) {
      this.users = updatedUserData;
    }
  });
}


openDialogFollower(): void {
this.dialogfollowerComponent.openDialogFollower();
}


openDialogFollowing(): void {
this.dialogFollowingComponent.openDialogFollowing();
}

copyUserLink() {
  const uid = this.userInfo.uid; // Get the user ID from the route parameter
  const link = document.createElement('textarea');
  link.textContent = `${window.location.origin}/#/profile/${uid}`;
  document.body.appendChild(link);
  link.select();
  document.execCommand('copy');
  document.body.removeChild(link);
  alert('Link copied to clipboard');
}


  logout() {
    this.authService.logout();
  }
  getObjectKeys(collection: any): string[] {
    return Object.keys(collection);
  }
  

  deleteGame(key: string) {
    this.collection = this.userInfo.collection;
    console.log(this.collection);
    delete this.collection[key]; // Remove the game with the given ID from the collection
    return this.homepageService.deleteFavorite(this.collection);
  }

  redirectToHome() {
    this.router.navigate(['/homepage']);
}
}
