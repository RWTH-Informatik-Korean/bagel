import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { RoundedBtnComponent } from './rounded-btn/rounded-btn.component';
import { NavbarSearchbarComponent } from './navbar-searchbar/navbar-searchbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { Signup2Component } from './signup2/signup2.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DummyHeaderComponent } from './dummy-header/dummy-header.component';
import { DummyMainComponent } from './dummy-main/dummy-main.component';
import { CardListComponent } from './card-list/card-list.component';


@NgModule({
  declarations: [
    AppComponent,
    RoundedBtnComponent,
    NavbarSearchbarComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    Signup2Component,
    SidenavComponent,
    DummyHeaderComponent,
    DummyMainComponent,
    CardListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
