import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SignupComponent } from '../../../components/signup/signup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../../../components/login/login.component';
import { Signup2Component } from '../../../components/signup2/signup2.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Output() SideNavToggle = new EventEmitter();

  isLoggedIn: boolean = false;

  constructor(public matDialog: MatDialog) {}
  
  login(): void{
    this.isLoggedIn = !this.isLoggedIn;
  }
  openSidenav() {
    this.SideNavToggle.emit();
  }
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
