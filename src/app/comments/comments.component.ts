import { Component, OnInit } from '@angular/core';
import { FirebaseUserModel } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

export interface COMMENT {
  id: string;
  titulo: string;
  comentario: String;
  createdAt: String;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: COMMENT[] = [];
  title = '';
  comentario = '';
  cargando = true;
  datosINIT = false;
  user: FirebaseUserModel = new FirebaseUserModel();
  constructor(private afs: AngularFirestore,  private route: ActivatedRoute,) {
   }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
        this.afs.collection('comentarios').doc(this.user.email).collection('comentarios').valueChanges().subscribe(
          (data: COMMENT[] ) => {
            if(data) {
                if(data.toString() == ''){
                  this.cargando = false;
                  this.datosINIT = true;
                  return;
                } else {
                  this.comments =  data;
                  this.cargando = false;
        
                  console.log(this.comments);
                }
            } else {
              this.cargando = false;
              return;
            }
            
          }
        );
      }
    });
  }

  addComment(){
    const id = this.afs.createId();
    const titulo = this.title;
    const comentario = this.comentario;
    const comment = {id, titulo, comentario, createdAt: new Date().toLocaleString()};
    this.afs.collection('comentarios').doc(this.user.  email).collection('comentarios').doc(id).set(comment);
  }

  deleteComment(idC) {
    this.afs.collection('comentarios').doc(this.user.  email).collection('comentarios').doc(idC).delete();
  }

}
