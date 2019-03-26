import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<any>;
  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, private router: Router) {
    this.usersCollection = afs.collection<any>('usuarios');
  }

  doRegister(value) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  addUser(id, ord) {
    // Persist a document id
    // const id = this.afs.createId();
    this.usersCollection
      .doc(id)
      .set(ord)
      .then(() => {
        console.log('Exito al añadir usuario');
        this.router.navigateByUrl('/home');
      })
      .catch(err => {
        console.log('Error al añadir usuario a firestore');
        console.log(err);
      });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            console.log('Sucesss');
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
}
