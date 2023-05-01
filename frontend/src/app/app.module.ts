import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from "@angular/material/dialog";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoundedBtnComponent } from './components/rounded-btn/rounded-btn.component';
import { SignupComponent } from './pages/user/signup/signup.component';
import { NavbarSearchbarComponent } from './pages/main/navbar-searchbar/navbar-searchbar.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { FooterComponent } from './pages/layout/footer/footer.component';
import { SidenavComponent } from './pages/layout/sidenav/sidenav.component';
import { CardListComponent } from './pages/main/card-list/card-list.component';
import { MainNavigationComponent } from './pages/main/main-navigation/main-navigation.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { TopButtonComponent } from './pages/layout/top-button/top-button.component';
import { PostPageComponent } from './pages/post/post-page/post-page.component';
import { CommentComponent } from './pages/post/comments/comment/comment.component';
import { CommentFormComponent } from './pages/post/comments/comment-form/comment-form.component';
import { CommentsComponent } from './pages/post/comments/comments.component';
import { AfterSearchComponent } from './pages/after-search/after-search.component';
import { PlusButtonComponent } from './pages/layout/plus-button/plus-button.component';
import { QuillModule, QuillEditorComponent } from 'ngx-quill';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [
    AppComponent,
    RoundedBtnComponent,
    NavbarSearchbarComponent,
    FooterComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    CardListComponent,
    MainNavigationComponent,
    RegisterComponent,
    PostPageComponent,
    CommentComponent,
    CommentFormComponent,
    CommentsComponent,
    MainPageComponent,
    SignupComponent,
    TopButtonComponent,
    AfterSearchComponent,
    PlusButtonComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    QuillModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
