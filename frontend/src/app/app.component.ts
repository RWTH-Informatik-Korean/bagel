import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'bagel';
  screenMode: string;
  loggedInFinished: boolean = false;
  
  constructor(
    private scroller: ViewportScroller,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }

  ngOnInit(): void {
    this.authSet();
    this.loginCheck();
  }

  
  @HostListener ('window:resize', ['$event'])
  onResize(event: any) {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }
  scrollToTop() {
    this.scroller.scrollToPosition([0, 0]);
  }
  plusNewCard() {
    this.router.navigate(['/register']);
  }

  async authSet() {
    // 로그인 정보 설정 - 오직 첫 로그인 때만
      // !로그인 -> 쿠키 확인
      const loggedInPassport = await Boolean(this.cookieService.get('loggedIn'));
      const googleLoggedInPassport = await Boolean(this.cookieService.get('googleLoggedIn'));
      const googleIDPassport = await this.cookieService.get('googleID');
      const userIDPassport = await this.cookieService.get('_id');
      const usernamePassport = await this.cookieService.get('username');
      const avatarUrlPassport = await this.cookieService.get('avatarUrl');

      // 로그인 성공
      if (loggedInPassport) {
        this.authService.setLoggedIn();
        if (userIDPassport) this.authService.setUserID(userIDPassport);
        if (googleIDPassport) this.authService.setGoogleID(googleIDPassport);
        if (usernamePassport) this.authService.setUsername(usernamePassport);
        if (avatarUrlPassport) this.authService.setAvatarUrl(avatarUrlPassport);
        return
      }
      //
      else if (!loggedInPassport && googleLoggedInPassport) {
        this.authService.setGoogleLoggedIn();
        if (userIDPassport) this.authService.setUserID(userIDPassport);
        if (googleIDPassport) this.authService.setGoogleID(googleIDPassport);
        if (usernamePassport) this.authService.setUsername(usernamePassport);
        if (avatarUrlPassport) this.authService.setAvatarUrl(avatarUrlPassport);
        this.router.navigate(['/login']);
      }
      // 비로그인 상태, 하지만 localStorage는 loggedIn(이미 로그인 성공했음) -> '로그인' + avatarUrl 설정
      else if (!this.authService.getLoggedIn() && loggedInPassport) {
        this.authService.setLoggedIn();
        if (userIDPassport) this.authService.setUserID(userIDPassport);
        if (googleIDPassport) this.authService.setGoogleID(googleIDPassport);
        if (usernamePassport) this.authService.setUsername(usernamePassport);
        if (avatarUrlPassport) this.authService.setAvatarUrl(avatarUrlPassport);
        return
      } 
    }
    
    // seesion이 만료된 경우 logout 실행
    loginCheck() {
      const stillLoggedIn = this.authService.checkSid();
      if (!stillLoggedIn) {
        this.authService.logoutUser();
        this.authService.setLoggedOut();
        this.cookieService.deleteAll();
        localStorage.clear();
        this.router.navigate(['/']);
      }
      return
    }
}
