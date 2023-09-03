import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UserinfoService } from 'src/app/services/userinfo/userinfo.service';

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
  userInfo: any;

  constructor(public dialogRef: MatDialog,
              private userinfo: UserinfoService) {}



selectProfilePicture(selectedAvatar: string) {
  // Store the selected avatar URL in a variable
  this.selectedAvatar = selectedAvatar;
}

saveProfile() {
  const avatarUpdatePromise = this.selectedAvatar
    ? this.userinfo.updateAvatar(this.selectedAvatar)
    : Promise.resolve(); // Resolve if no avatar selected

  const updatePseudoPromise = this.selectedAvatar
    ? Promise.resolve() // Skip updating pseudo if avatar is being updated
    : this.userinfo.updatePseudo(this.users.pseudo);

  Promise.all([avatarUpdatePromise, updatePseudoPromise])
    .then(() => {
      alert('Profile updated successfully');
      // Reload the entire page to reflect changes
      document.location.reload();
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      alert('Something went wrong');
    });
}




}
