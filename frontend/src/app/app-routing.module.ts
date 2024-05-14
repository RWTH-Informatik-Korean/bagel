import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { PostPageComponent } from './pages/post/post-page/post-page.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { LoginComponent } from './pages/user/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:googleID', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'card/:cardId', component: PostPageComponent, canActivate: [authGuard] }, 
  { path: '**', component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ MainPageComponent ];
