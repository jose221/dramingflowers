import { UserResolver } from './resolvers/user/user.resolver';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from './comments/comments.component';

import { AgmCoreModule } from '@agm/core';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQJyNrb6dX66fTMfDRTVlFNfQaRiHvcss'
    }),
    AngularFireModule.initializeApp(environment.firebaseconfig),
    NgxLoadingModule.forRoot({})
  ],
  providers: [UserResolver, { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule {}
