import { UserResolver } from './resolvers/user/user.resolver';
import { UserGuard } from './guards/user/user.guard';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: { data: UserResolver }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: { data: UserResolver }
  },
  { path: 'login', component: LoginComponent, canActivate: [UserGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [UserGuard] },
  { path: 'comments', component: CommentsComponent, canActivate: [AuthGuard], resolve: { data: UserResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
