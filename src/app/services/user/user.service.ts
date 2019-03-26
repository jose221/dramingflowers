import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: value.name,
          photoURL: user.photoURL,
        })
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }
}
