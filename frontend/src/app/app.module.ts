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
import { NavbarSearchbarComponent } from './pages/main/navbar-searchbar/navbar-searchbar.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { FooterComponent } from './pages/layout/footer/footer.component';
import { SidenavComponent } from './pages/layout/sidenav/sidenav.component';
import { CardListComponent } from './pages/main/card-list/card-list.component';
import { MainNavigationComponent } from './pages/main/main-navigation/main-navigation.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { QuillModule, QuillEditorComponent } from 'ngx-quill';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { Signup2Component } from './components/signup2/signup2.component';
import { TopButtonComponent } from './pages/layout/top-button/top-button.component';
import { PostPageComponent } from './pages/post/post-page/post-page.component';
import { CommentComponent } from './pages/post/comments/comment/comment.component';
import { CommentFormComponent } from './pages/post/comments/comment-form/comment-form.component';
import { CommentsComponent } from './pages/post/comments/comments.component';
import { AfterSearchComponent } from './pages/after-search/after-search.component';
import { PlusButtonComponent } from './pages/layout/plus-button/plus-button.component';

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
    LoginComponent,
    SignupComponent,
    Signup2Component,
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
    // QuillModule.forRoot({
    //   modules: {
    //     syntax: true,
    //     toolbar: [ ]
    //   }
    // }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
