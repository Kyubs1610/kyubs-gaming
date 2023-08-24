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
  // Check if there's a selected avatar
  if (this.selectedAvatar) {
    // Update the avatar in the database
    this.userinfo.updateAvatar(this.selectedAvatar)
      .then(() => {
        // Clear the selected avatar after updating
        this.selectedAvatar = '';
        // Now, update the pseudo
        this.userinfo.updatePseudo(this.users.pseudo)
          .then(() => {
            alert('Avatar and Pseudo updated successfully');
            // Reload the entire page to reflect changes
            document.location.reload();
          })
          .catch((error) => {
            console.error('Error updating pseudo:', error);
            // You might want to handle this error more gracefully
          });
      })
      .catch((error) => {
        console.error('Error updating avatar:', error);
        alert('Something went wrong');
      });
  } else {
    // No avatar selected
    // Just update the pseudo
    this.userinfo.updatePseudo(this.users.pseudo)
      .then(() => {
        alert('Pseudo updated successfully');
        // Reload the entire page to reflect changes
        document.location.reload();
      })
      .catch((error) => {
        console.error('Error updating pseudo:', error);
        alert('Something went wrong');
      });
  }
}


}
