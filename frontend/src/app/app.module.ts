import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from "@angular/material/dialog";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RoundedBtnComponent } from './rounded-btn/rounded-btn.component';
import { NavbarSearchbarComponent } from './navbar-searchbar/navbar-searchbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DummyHeaderComponent } from './dummy-header/dummy-header.component';
import { CardListComponent } from './card-list/card-list.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { RegisterComponent } from './register/register.component';
import { QuillModule } from 'ngx-quill';
import { RegisterPageComponent } from './Pages/register-page/register-page.component';
import { MainPageComponent } from './Pages/main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Signup2Component } from './signup2/signup2.component';
import { SearchService } from './services/search.service';
import { TopButtonComponent } from './top-button/top-button.component';


@NgModule({
  declarations: [
    AppComponent,
    RoundedBtnComponent,
    NavbarSearchbarComponent,
    FooterComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    DummyHeaderComponent,
    CardListComponent,
    MainNavigationComponent,
    RegisterComponent,
    RegisterPageComponent,
    MainPageComponent,
    LoginComponent,
    SignupComponent,
    Signup2Component,
    TopButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [ ]
      }
    }),
    HttpClientModule,
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
