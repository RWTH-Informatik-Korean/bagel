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
    // 로그인 정보 설정
    // !로그인 -> 쿠키 확인
    const loggedInPassport = await Boolean(this.cookieService.get('loggedIn'));
    const googleLoggedInPassport = await Boolean(this.cookieService.get('googleLoggedIn'));
    const userIDPassport = await this.cookieService.get('_id');
    const usernamePassport = await this.cookieService.get('username');
    const avatarUrlPassport = await this.cookieService.get('avatarUrl');

    // 로그인 성공
    if (loggedInPassport) {
      this.authService.setLoggedIn();
      if (userIDPassport) this.authService.setUserID(userIDPassport);
      if (usernamePassport) this.authService.setUsername(usernamePassport);
      if (avatarUrlPassport) this.authService.setAvatarUrl(avatarUrlPassport);

      console.log('로그인 성공')
      console.log(this.authService.getLoggedIn(), this.authService.getUserID(), this.authService.getUsername(), this.authService.getAvatarUrl());
      return
    }
    //
    else if (!loggedInPassport && googleLoggedInPassport) {
      this.authService.setGoogleLoggedIn();
      if (userIDPassport) this.authService.setUserID(userIDPassport);
      if (usernamePassport) this.authService.setUsername(usernamePassport);
      if (avatarUrlPassport) this.authService.setAvatarUrl(avatarUrlPassport);
      this.router.navigate(['/login']);
    }
    // 비로그인 상태, 하지만 localStorage는 loggedIn(이미 로그인 성공했음) -> '로그인' + avatarUrl 설정
    else if (!this.authService.getLoggedIn() && loggedInPassport) {
      this.authService.setLoggedIn();
      if (userIDPassport) this.authService.setUserID(userIDPassport);
      if (usernamePassport) this.authService.setUsername(usernamePassport);
      if (avatarUrlPassport) this.authService.setAvatarUrl(avatarUrlPassport);
      console.log('로그인으로 바꿨어')

      console.log(this.authService.getLoggedIn(), this.authService.getUserID(), this.authService.getUsername(), this.authService.getAvatarUrl());
      return
    } 
  }

}
