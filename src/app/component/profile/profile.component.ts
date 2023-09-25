import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/login/login.service';
import { UserinfoService } from 'src/app/services/userinfo/userinfo.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user!: any 
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
  userInfos: any;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private userinfoService: UserinfoService,
    ) {}

    ngOnInit() {
      // Fetch the currently logged-in user
      this.authService.getCurrentUser().subscribe((user) => {
        if (user) {
          console.log('User is authenticated:', user);
  
          this.userinfoService.getProfileData(user.uid).subscribe((userData) => {
            if (userData.exists) {
              console.log('User data retrieved:', userData.data());
  
              // Access the user's data in the "userInfo" collection
              this.userInfos = userData.data() 
              console.log('User info:', this.userInfos);
  
              // Extract the userId from the route parameter
              this.route.params.subscribe((params) => {
                const userId = params['userId'];
  
                // Fetch user information based on userId
                this.userinfoService.getProfileData(userId).subscribe((userData) => {
                  this.userInfo = userData.data();
                  console.log('Other user info:', this.userInfo);
  
                  // Check if the currently logged-in user is already following the other user
                  const isFollowing = this.userInfos.following.includes(userId);
  
                  // Set the follow button text based on the follow state
                  this.followButtonText = isFollowing ? 'Unfollow' : 'Follow';
                });
              });
            } else {
              console.log('User data not found.');
            }
          });
        } else {
          console.log('User is not authenticated.');
        }
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
      const userId= this.userInfo.uid;
      this.followUser(userId); // Pass the userId from the URL
      console.log(this.userInfo)
      this.followButtonText = "Unfollow";
    } else {
      const userId= this.userInfo.uid;
      this.unfollowUser(userId); // Pass the userId from the URL
      this.followButtonText = "Follow";
    }
  }
  
  followUser(userId: string) {

    // Implement logic to follow the user with the provided userId
    this.userinfoService.followUserService(userId, this.userInfos, this.userInfo);
    console.log(`Following user with ID: ${userId} `);
    //send to the db the user id of the user that is followed

  }
  
  unfollowUser(userId: string) {
    // Implement logic to unfollow the user with the provided userId
    this.userinfoService.unfollowUserService(userId, this.userInfos, this.userInfo);
    console.log(`Unfollowing user with ID: ${userId}`);
  }
  
  redirectToDashboard() {
    this.router.navigate(['/dashboard']); 
  }
  getObjectKeys(collection: any): string[] {
    return Object.keys(collection);
  }


}
