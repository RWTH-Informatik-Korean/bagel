import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Output() SideNavToggle = new EventEmitter();

  headerFixed: boolean = false;
  screenMode: string;
  isLoggedIn: boolean;
  avatarUrl: string;

  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {
    
  }
  
  ngOnInit(): void {  
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";

    this.userData();
  }

  async userData() {
    await this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
    await this.authService.avatarUrl().subscribe(avtarUrl => {
      this.avatarUrl = avtarUrl;
    })
    console.log('로그인 됨?: ', this.isLoggedIn, ' 아바타는?: ', this.avatarUrl);
    return
  }

  // google login Button(OAuth2) 
  signup(): void {
    // !구글 로그인 성공 && !rwth email 인증
    if (!this.authService.getGoogleLoggedIn()) {
       window.location.href = 'http://localhost:8080/auth/login/google';
       return
    } 
    // 구글 로그인 성공 && !rwth email 인증
    else if (this.authService.getGoogleLoggedIn && !this.authService.getVerified()){
      this.router.navigate(['/login']);
      return
    } 
    return
  }  

  openSidenav() {
    this.SideNavToggle.emit();
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
