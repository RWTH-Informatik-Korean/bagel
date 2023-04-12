import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { SignupComponent } from '../../../pages/user/signup/signup/signup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../../../components/login/login.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Output() SideNavToggle = new EventEmitter();

  headerFixed: boolean = false;
  isLoggedIn: boolean = false;
  screenMode: string;

  constructor(
    public matDialog: MatDialog,
    private router: Router,
  ) {
  }
  
  // route to singup page
  signup(): void {
    this.router.navigate(['/signup']);
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
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }
  @HostListener ('window:resize', ['$event'])
  onResize(event: any) {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }
  @HostListener('window:scroll', ['$event']) onscroll() {
    if(window.scrollY > 1) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }
}
