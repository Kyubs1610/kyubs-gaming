import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserinfoService } from 'src/app/services/userinfo/userinfo.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})


export class DialogComponent {

  selectedAvatar?: string;
  users = { 
    avatar:'',
    pseudo: '',
    email: '',
   };
  userInfo = {
    avatar:'',
    pseudo: '',
   } ;
  user: any;

  constructor( public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { users: any,  },
              private userinfo: UserinfoService,
              private router : Router,
              private authService : AuthService) {}

ngOnInit() {
  this.authService.getCurrentUser().subscribe((user) => {
    this.user = user;
    this.userinfo.getUserData(this.user?.uid).subscribe((userData) => {
      this.userInfo = userData.data() as { avatar: string; pseudo: string; };
        });
  });
}


selectProfilePicture(selectedAvatar: string) {
  // Store the selected avatar URL in a variable
  this.selectedAvatar = selectedAvatar;
}

saveProfile() {
  if (this.selectedAvatar) {
    this.users.avatar = this.selectedAvatar;
    this.userinfo.updateAvatar(this.users.avatar).then(() => {
      // Update the user's avatar and close the dialog
      this.dialogRef.close(this.users);
    });
  }
  if (this.users.pseudo) {
    this.userinfo.updatePseudo(this.users.pseudo).then(() => {
      // Update the user's pseudo and close the dialog
      this.dialogRef.close(this.users);
    });
  }
 // if any update on the pseudo or avatar, reload the page
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/dashboard']);
  });
}
}