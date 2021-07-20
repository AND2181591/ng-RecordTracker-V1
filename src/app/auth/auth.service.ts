import { Injectable, NgZone } from '@angular/core';
import { User } from '../shared/models/User';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signedin$ = new BehaviorSubject(null);
  userData: any;

  constructor(
    private router: Router, 
    public afs: AngularFirestore, 
    private afAuth: AngularFireAuth, 
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.signedin$.next(true);
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  loggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.signedin$.next(true);
    }
  }


  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.signedin$.next(true);
          this.router.navigateByUrl('/home');
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.signedin$.next(true);
          this.router.navigateByUrl('/home');
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email
    }
    console.log(userData);
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.signedin$.next(false);
      this.router.navigateByUrl('/');
    })
  }
}
