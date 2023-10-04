import { AuthService } from './../../services/login/login.service';
import { Component, Inject } from '@angular/core';
import { UserinfoService } from 'src/app/services/userinfo/userinfo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-dialogfollower',
  templateUrl: './dialogfollower.component.html',
  styleUrls: ['./dialogfollower.component.scss']
})
export class DialogfollowerComponent {


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
  uid?: any;
  
  constructor( public dialogRef: MatDialogRef<DialogfollowerComponent>,
  


    @Inject(MAT_DIALOG_DATA) public data: { followers?: any[], following?: any[] },
              private userinfo: UserinfoService,
              private dialog: MatDialog,
              private authService: AuthService,

              ) {
                this.userData = data.followers || data.following || [];

              }

ngOnInit() {
  const profileUid = this.getProfileUidFromUrl();

  // Utiliser l'UID pour obtenir les followers du profil consulté
  this.userinfo.getUserData(profileUid).subscribe((userData) => {
    this.user = userData.data();
    console.log('user:', this.user);
    this.followers = this.user?.followers;
    console.log('followers:', this.followers);
    if(this.user === undefined){
      this.authService.getCurrentUser().subscribe((user) => {
        this.user = user;
        this.userinfo.getUserData(this.user?.uid).subscribe((userData) => {
          this.user = userData.data();
          this.followers = this.user.followers;
          this.following = this.user.following;
        });
      }
      );
    }
  });
}
getProfileUidFromUrl(): string {
  // Récupérer le dernier segment de l'URL après "/profile/"
  const urlParts = window.location.hash.split('/'); // Utilisation de window.location.hash pour inclure le fragment d'URL
  const uidIndex = urlParts.indexOf('profile') + 1;
  return uidIndex < urlParts.length ? urlParts[uidIndex] : '';
}

openDialogFollower(): void {
  const dialogRef: MatDialogRef<DialogfollowerComponent> = this.dialog.open(DialogfollowerComponent, {
    width: '300px',
    data: { followers: this.followers},
    panelClass: 'custom-dialog-container', 
    
  });
  dialogRef.afterClosed().subscribe( error => {
    console.log(error);
  });
}
goToProfile(uid: string) {
  console.log(uid);
  this.dialogRef.close();
  window.location.hash = `profile/${uid}`;
}


closeDialog(): void {
  this.dialogRef.close();
}

}
