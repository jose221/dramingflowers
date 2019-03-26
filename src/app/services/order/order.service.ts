import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class OrderService {
  order: AngularFirestoreDocument<any>;
  constructor(public afs: AngularFirestore, private router: Router,) {}

  updateOrderAcepted(id, value) {
    this.order = this.afs.doc(`/orders/${id}`);
    this.order.update({
      6: {
        confirmFlower: true,
        delivered: false,
        ratings: false,
        lat: value.lat,
        lng: value.lng
      }
    });
  }
  updateOrderRechazed(id, value, email) {
    this.order = this.afs.doc(`/orders/${id}`);
    this.order.update({
      2: value,
      3: email
    }).then(
      (data) => {
        window.location.reload();
      }
    );
  }

  updateOrderDelivered(id, value) {
    this.order = this.afs.doc(`/orders/${id}`);
    this.order.update({
      6: {
        confirmFlower: true,
        delivered: true,
        ratings: false,
        lat: value.lat,
        lng: value.lng
      }
    });
  }
}
