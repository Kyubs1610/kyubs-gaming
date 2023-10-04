import { Component, Inject } from '@angular/core';
import { UserinfoService } from 'src/app/services/userinfo/userinfo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-dialogfollowing',
  templateUrl: './dialogfollowing.component.html',
  styleUrls: ['./dialogfollowing.component.scss']
})
export class DialogfollowingComponent {

  selectedAvatar?: string;
  users = { 
    avatar:'',
    pseudo: '',
    email: '',
    followers: [{ avatar: '', pseudo: '' }],
    following: [{ avatar: '', pseudo: '' }],
   };

  user?: any;
  followers?: any[];
  following?: any[];
  userData: any;

  constructor( public dialogRef: MatDialogRef<DialogfollowingComponent>,
  


    @Inject(MAT_DIALOG_DATA) public data: { followers?: any[], following?: any[] },
              private userinfo: UserinfoService,
              private authService: AuthService,
              private dialog: MatDialog,

              ) {
                this.userData = data.followers || data.following || [];

              }

ngOnInit() {
  const profileUid = this.getProfileUidFromUrl();

  // Utiliser l'UID pour obtenir les followers du profil consulté
  this.userinfo.getUserData(profileUid).subscribe((userData) => {
    this.user = userData.data();
    console.log('user:', this.user);
    this.following = this.user?.following;
    console.log('following:', this.following);
    if(this.user === undefined){
      this.authService.getCurrentUser().subscribe((user) => {
        this.user = user;
        this.userinfo.getUserData(this.user?.uid).subscribe((userData) => {
          this.user = userData.data();
          this.followers = this.user.followers;
          this.following = this.user.following;
        });
  });
}
});
}

getProfileUidFromUrl(): string {
  // Récupérer le dernier segment de l'URL après "/profile/"
  const urlParts = window.location.hash.split('/'); // Utilisation de window.location.hash pour inclure le fragment d'URL
  const uidIndex = urlParts.indexOf('profile') + 1;
  return uidIndex < urlParts.length ? urlParts[uidIndex] : '';
}


openDialogFollowing(): void {
  const dialogRef: MatDialogRef<DialogfollowingComponent> = this.dialog.open(DialogfollowingComponent, {
    width: '300px',
    data: { following: this.following},
    panelClass: 'custom-dialog-container', 
  });
  dialogRef.afterClosed().subscribe( close => {
    console.log("closed");
   
  });
}

closeDialog(): void {
  this.dialogRef.close();
}
goToProfile(uid: string) {
  console.log(uid);
  this.dialogRef.close();
  window.location.hash = `profile/${uid}`;
}

}
