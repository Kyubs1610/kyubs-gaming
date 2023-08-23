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

  constructor(public dialogRef: MatDialog,
              private userinfo: UserinfoService) {}


selectProfilePicture(selectedAvatar: string) {
  // Store the selected avatar URL in a variable
  this.selectedAvatar = selectedAvatar;
}

saveProfile() {
  if (this.selectedAvatar) {
    // Update the avatar in the database
    this.userinfo.updateAvatar(this.selectedAvatar).then(() => {
      alert('Avatar updated successfully');
      // Clear the selected avatar after updating
      this.selectedAvatar = '';
      // reload the avatar in the header
      window.location.reload();

    }).catch((error) => {
      console.error('Error updating avatar:', error);
    });
  }
}

}
