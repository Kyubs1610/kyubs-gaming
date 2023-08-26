import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  

@Injectable({
  providedIn: 'root'
})


export class UserinfoService {

  constructor(private firestore: AngularFirestore,
              private fireauth: AngularFireAuth) {}

getUserData(uid: string) {
  return this.firestore.collection('userInfo').doc(uid).get();
}
              
updatePseudo(pseudo: string) {
  return this.fireauth.currentUser.then((user) => {
    if (user) {
      const userUid = user.uid;
      return user.updateProfile({
        displayName: pseudo,
      }).then(() => {
       return this.firestore.collection('userInfo').doc(userUid).update({ pseudo: pseudo });
      });
    } else {
      return Promise.resolve(); // Renvoyer une promesse vide si l'utilisateur n'est pas connecté
    }
  });
  
}

updateAvatar(avatarLink: string) {
  return this.fireauth.currentUser.then((user) => {
    if (user) {
      return this.firestore.collection('userInfo').doc(user.uid).update({ avatar: avatarLink });
    } else {
      return Promise.resolve(); // Return an empty promise if the user is not logged in
    }
  });
}

}


