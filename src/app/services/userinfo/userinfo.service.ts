import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  
import { AuthService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})


export class UserinfoService {

  constructor(private firestore: AngularFirestore,
              private fireauth: AngularFireAuth,
              private authService: AuthService) {}

getUserData(uid: string) {
  return this.firestore.collection('userInfo').doc(uid).get();
}

getProfileData(uid: string) {
  return this.firestore.collection('user').doc(uid).get();
}

loadUserData() {
   this.authService.getCurrentUser().subscribe((user) => {
    if (user) {
      console.log('User is authenticated:', user);

      this.getProfileData(user.uid).subscribe((userData) => {
        if (userData.exists) {
          console.log('User data retrieved:', userData.data());
          // You can assign userData.data() to a different variable for use in your component.
        } else {
          console.log('User data not found.');
        }
      });
    } else {
      console.log('User is not authenticated.');
    }
  });
}
              
updatePseudo(pseudo: string) {
  return this.fireauth.currentUser.then((user) => {
    if (user) {
      const updatePseudoPromise = [];
      // Update pseudo in 'userInfo' collection
      const userInfoUpdatePromise = this.firestore.collection('userInfo').doc(user.uid).update({ pseudo: pseudo });
      updatePseudoPromise.push(userInfoUpdatePromise);

      // Use Promise.all to update both collections in parallel
      return Promise.all(updatePseudoPromise).then(() => {
        console.log('pseudo updated in userInfo collections');
      })
    } else {
      return Promise.resolve(); // Renvoyer une promesse vide si l'utilisateur n'est pas connecté
    }
  });
  
}

updateAvatar(avatarLink: string) {
  return this.fireauth.currentUser.then((user) => {
    if (user) {
      const avatarUpdatePromise = [];
      // Update avatar in 'userInfo' collection
      const userInfoUpdatePromise = this.firestore.collection('userInfo').doc(user.uid).update({ avatar: avatarLink });
      avatarUpdatePromise.push(userInfoUpdatePromise);

      // Use Promise.all to update both collections in parallel
      return Promise.all(avatarUpdatePromise).then(() => {
        console.log('Avatar updated in userInfo collections');
      });
    } else {
      return Promise.resolve(); // Return an empty promise if the user is not logged in
    }
  });
}


followUser(userId: string) {
  const documentId = 'uniqueDocumentId';
  return this.firestore.collection('userInfo').doc(documentId).update({ followers: userId });
}
unfollowUser(userId: string) {
  return this.firestore.collection('userInfo').doc().update({ followers: userId });
}


}

