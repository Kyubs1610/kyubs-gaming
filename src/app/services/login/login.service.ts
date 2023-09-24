import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;

  constructor(private fireauth : AngularFireAuth,
              private router : Router,
              private firestore : AngularFirestore
              ) { }

  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');
  
      if (res.user?.emailVerified) {
        // Check if the user already exists in the database
        this.firestore.collection('userInfo').doc(res.user?.uid).get().toPromise().then(doc => {
          if (doc && doc.exists) {
            // User exists, perform an update
            this.router.navigate(['homepage']);
          } else {
            // User doesn't exist, perform a set
            this.firestore.collection('userInfo').doc(res.user?.uid).set({
              uid: res.user?.uid,
              email: res.user?.email,
            })
            this.firestore.collection('user').doc(res.user?.uid).set({
              uid: res.user?.uid,
            })
            .then(() => {
              this.router.navigate(['homepage']);
            });
          }
        });
  
      } else {
        this.router.navigate(['/verify-email']);
      }
    }, err => {
      alert(err.message);
      this.router.navigate(['/']);
    })
  }
  

  // register method
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
      this.router.navigate(['/']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/verify-email']);
      }, err => {
        alert('Something went wrong');
      })
  }

  // email verification
  sendEmailForVarification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/verify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
      return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.router.navigate(['/homepage']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
      const userInfo = { uid: res.user?.uid, email: res.user?.email };
      const user = { uid: res.user?.uid};

    // Check if the user already exists in the database
    this.firestore.collection('userInfo').doc(res.user?.uid).get().toPromise().then(doc => {
      if (doc && doc.exists) { // Check if doc exists before accessing its properties
        // User exists, perform an update
        this.firestore.collection('userInfo').doc(res.user?.uid).update(userInfo);
      } else {
        // User doesn't exist, perform a set
        this.firestore.collection('userInfo').doc(res.user?.uid).set(userInfo);
        this.firestore.collection('user').doc(res.user?.uid).set(user)
      }
    });
  
    }, err => {
      alert(err.message);
    });
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    if(token) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentUser() {
    return this.fireauth.authState;
  }


}