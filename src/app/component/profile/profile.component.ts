import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/login/login.service';
import { UserinfoService } from 'src/app/services/userinfo/userinfo.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: any 
  userId: string = '';
  users = { 
          avatar:'',
          pseudo: '',
          email: '',
         };
  userInfo: any;
  games!: any[];
  collection: any[] = []; 
  followButtonText: string = "Follow";

  constructor(private authService: AuthService,
              private userinfo: UserinfoService,
              private route: ActivatedRoute,
              private router: Router,
              private userinfoService: UserinfoService
    ) {}

    ngOnInit() {
       // Fetch the currently logged-in user
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.userinfoService.getProfileData(this.user?.uid).subscribe((userData) => {
        this.user = userData.data();
        console.log(this.user);
      });
    });

    // Extract the userId from the route parameter
    this.route.params.subscribe(params => {
      const userId = params['userId'];

      // Fetch user information based on userId
      this.userinfo.getUserData(userId).subscribe(userData => {
        this.userInfo = userData.data();
        console.log(this.userInfo);
      });
    });
  }

  logout() {
    this.authService.logout();
  }

  navigateToUserProfile(userId: string) {
    userId = this.user.uid;
    this.router.navigate(['profile', userId]);
  }
  toggleFollow(userId: string) {
    if (this.followButtonText === "Follow") {
      this.followUser(userId); // Pass the userId from the URL
      this.followButtonText = "Unfollow";
    } else {
      this.unfollowUser(userId); // Pass the userId from the URL
      this.followButtonText = "Follow";
    }
  }
  
  followUser(userId: string) {
    // Implement logic to follow the user with the provided userId
    this.userinfo.followUser(userId);
    console.log(`Following user with ID: ${userId}`);
  }
  
  unfollowUser(userId: string) {
    // Implement logic to unfollow the user with the provided userId
    this.userinfo.unfollowUser(userId);
    console.log(`Unfollowing user with ID: ${userId}`);
  }
  
  redirectToDashboard() {
    this.router.navigate(['/dashboard']); 
  }
  getObjectKeys(collection: any): string[] {
    return Object.keys(collection);
  }
  
}
