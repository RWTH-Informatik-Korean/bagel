import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Signup2Component } from '../signup2/signup2.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Output() SideNavToggle = new EventEmitter();

  isLoggedIn: boolean = false;

  login(): void{
    this.isLoggedIn = !this.isLoggedIn;
  }

  openSidenav() {
    this.SideNavToggle.emit();
  }

  constructor(public matDialog: MatDialog) {}

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "signup-component";
    dialogConfig.height = "600px";
    dialogConfig.width = "800px";
    const modalDialog = this.matDialog.open(SignupComponent, dialogConfig);
  }

  openLoginModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "login-component";
    dialogConfig.height = "600px";
    dialogConfig.width = "800px";
    const modalDialog = this.matDialog.open(LoginComponent, dialogConfig);
  }


  ngOnInit(): void {
      
  }
}
