import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  constructor(private afs: AngularFirestore) {
    
  }

 addComment() {
   this.itemsCollection = this.afs.collection('comentarios').doc('1').collection('comentarios');
   console.log(this.itemsCollection);
 }
}