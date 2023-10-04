import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  

@Injectable({
  providedIn: 'root'
})


export class UserinfoService {

  user: any;
  connectedUser: any;
  userInfo: any;

  constructor(private firestore: AngularFirestore,
              private fireauth: AngularFireAuth,
              ) {}



getUserData(uid: string) {
  return this.firestore.collection('userInfo').doc(uid).get();
}

getProfileData(uid: string) {
  return this.firestore.collection('userInfo').doc(uid).get();
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

followUserService(userId: string, connectedUser: any, userInfo: any) {
  // Assurez-vous que userInfos contient les données de l'utilisateur connecté
  this.connectedUser = connectedUser;

  // Mise à jour du tableau "following" de l'utilisateur connecté
  const updatedFollowing = this.connectedUser.following || [];

  if (!updatedFollowing.some((following: { uid: string }) => following.uid === userId)) {
    updatedFollowing.push({
      uid: userId,
      pseudo: userInfo.pseudo, // Assurez-vous que userInfo contient les données correctes
      avatar: userInfo.avatar,
    });

    this.firestore
      .collection('userInfo')
      .doc(this.connectedUser.uid)
      .update({ following: updatedFollowing })
      .then(() => {})
      .catch((error) => {
        console.error('Error following user:', error);
      });
  }

  // Assurez-vous que userInfo contient les données du profil utilisateur à suivre
  this.userInfo = userInfo;
  console.log('user to follow', this.userInfo);

  // Mise à jour du tableau "followers" du profil utilisateur à suivre
  const updatedFollowers = this.userInfo.followers || [];

  if (!updatedFollowers.some((follower: { uid: string }) => follower.uid === this.connectedUser.uid)) {
    updatedFollowers.push({
      uid: this.connectedUser.uid,
      pseudo: this.connectedUser.pseudo,
      avatar: this.connectedUser.avatar,
    });

    this.firestore
      .collection('userInfo')
      .doc(this.userInfo.uid)
      .update({ followers: updatedFollowers })
      .then(() => {})
      .catch((error) => {
        console.error('Error following user:', error);
      });
  }
}

// La fonction unfollowUserService semble correcte et ne nécessite pas de modifications.


unfollowUserService(userId: string, connectedUser: any, userInfo: any) {
  this.connectedUser = connectedUser;

  // Remove the user being unfollowed from the currently logged-in user's "following" array
  const updatedFollowing = (this.connectedUser.following || []).filter(
    (following: { uid: string }) => following.uid !== userId
  );

  this.firestore
    .collection('userInfo')
    .doc(this.connectedUser.uid)
    .update({ following: updatedFollowing })
    .then(() => {})
    .catch((error) => {
      console.error('Error unfollowing user:', error);
    });

  this.userInfo = userInfo;

  // Remove the current user from the other user's "followers" array
  const updatedFollowers = (this.userInfo.followers || []).filter(
    (follower: { uid: string }) => follower.uid !== this.connectedUser.uid
  );

  this.firestore
    .collection('userInfo')
    .doc(this.userInfo.uid)
    .update({ followers: updatedFollowers })
    .then(() => {})
    .catch((error) => {
      console.error('Error unfollowing user:', error);
    });
}

}

