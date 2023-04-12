import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterSearchComponent } from './pages/after-search/after-search.component';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { PostPageComponent } from './pages/post/post-page/post-page.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { SignupComponent } from './pages/user/signup/signup/signup.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'home', redirectTo: '/', pathMatch: 'full'},
  { path: 'signup', component: SignupComponent},
  { path: 'search', component: AfterSearchComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'card/:cardId', component: PostPageComponent }, 
    // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ MainPageComponent ];

