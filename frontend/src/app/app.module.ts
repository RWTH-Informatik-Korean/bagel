import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { RoundedBtnComponent } from './rounded-btn/rounded-btn.component';
import { NavbarSearchbarComponent } from './navbar-searchbar/navbar-searchbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DummyHeaderComponent } from './dummy-header/dummy-header.component';
import { CardListComponent } from './card-list/card-list.component';
import { LoginComponent } from './login/login.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { MainPageComponent } from './Pages/main-page/main-page.component';


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
    LoginComponent,
    RoundedBtnComponent,
    MainNavigationComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [HeaderComponent]
})
export class AppModule { }
