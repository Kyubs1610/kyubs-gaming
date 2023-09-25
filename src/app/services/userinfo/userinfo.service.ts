import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  
import { AuthService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})


export class UserinfoService {

  user: any;
  userInfos: any;
  userInfo: any;

  constructor(private firestore: AngularFirestore,
              private fireauth: AngularFireAuth,
              private authService: AuthService) {}



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

followUserService(userId: string, userInfos: any, userInfo: any) {
this.userInfos = userInfos;
  // Update the currently logged-in user's "following" array with the user they are following (userId)
  const updatedFollowing = this.userInfos.following || [];
  if (!updatedFollowing.includes(userId)) {
    // Ajouter le nouvel utilisateur à la liste des suivis
    updatedFollowing.push(userId);

  this.firestore
    .collection('userInfo')
    .doc(this.userInfos.uid) // Specify the document ID (UID of the currently logged-in user)
    .update({ following: updatedFollowing })
    .then(() => {
      console.log(`Following user with ID: ${userId}`);
    })
    .catch((error) => {
      console.error('Error following user:', error);
    });
  }
    this.userInfo = userInfo;
  // Update the other user's "followers" array with the follower (current user's UID)
  const updatedFollowers = [this.userInfos.uid];
  console.log(updatedFollowers);
  this.firestore
    .collection('userInfo')
    .doc(this.userInfo.uid) // Specify the document ID (UID of the user being followed)
    .update({ followers: updatedFollowers })
    .then(() => {
      console.log(`Updated followers for user with ID: ${userId}`);
    })
    .catch((error) => {
      console.error('Error updating followers:', error);
    });
}


unfollowUserService(userId: string, userInfos: any, userInfo: any) {
this.userInfos = userInfos;
  // Update the currently logged-in user's "following" array by removing the unfollowed user (userId)
  const updatedFollowing = this.userInfos.following.filter((id:string) => id !== userId);
  this.firestore
    .collection('userInfo')
    .doc(this.userInfos.uid) // Specify the document ID (UID of the currently logged-in user)
    .update({ following: updatedFollowing })
    .then(() => {
      console.log(`Unfollowing user with ID: ${userId}`);
    })
    .catch((error) => {
      console.error('Error unfollowing user:', error);
    });

    this.userInfo = userInfo;
  // Update the other user's "followers" array by removing the unfollower (current user's UID)
  const updatedFollowers = this.userInfo.followers.filter((id:string) => id !== this.userInfo.uid);
  this.firestore
    .collection('userInfo')
    .doc(this.userInfo.uid) // Specify the document ID (UID of the user being unfollowed)
    .update({ followers: updatedFollowers })
    .then(() => {
      console.log(`Updated followers for user with ID: ${userId}`);
    })
    .catch((error) => {
      console.error('Error updating followers:', error);
    });
}


}

