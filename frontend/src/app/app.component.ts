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
    const googleIDPasport = await this.cookieService.get('googleID');
    const avatarUrl = await this.cookieService.get('avatarUrl');

    // 로그인 성공
    if (loggedInPassport) {
      this.authService.setLoggedIn();
      this.authService.setGoogleID(googleIDPasport)
      this.authService.setAvatarUrl(avatarUrl);
      // backend에서 받은 cookie 제거
      // this.cookieService.delete('googleID');
      // this.cookieService.delete('loggedIn');
      // this.cookieService.delete('avatarUrl');

      console.log('로그인 성공')
      console.log(this.authService.getLoggedIn(), this.authService.getGoogleID(), this.authService.getAvatarUrl());
      return
    }
    // 비로그인 상태 && backend로부터 받은 로그인 성공(cookie) -> '로그인' + avatarUrl 설정
    else if (!this.authService.getLoggedIn() && loggedInPassport) {
      this.authService.setLoggedIn();
      this.authService.setGoogleID(googleIDPasport)
      this.authService.setAvatarUrl(avatarUrl);
      console.log('로그인으로 바꿨어')

      // backend에서 받은 cookie 제거
      // this.cookieService.delete('googleID');
      // this.cookieService.delete('loggedIn');
      // this.cookieService.delete('avatarUrl');

      console.log(this.authService.getLoggedIn(), this.authService.getGoogleID(), this.authService.getAvatarUrl());
      return
    } 
    // google 로그인 완료 && rwth 인증 전 -> 인증 화면 (login page)
    else if (googleIDPasport && !this.authService.getVerified()) {
      this.router.navigate(['/login']);
      console.log('미인증이어서 인증 하러가')

      // backend에서 받은 cookie 제거
      // this.cookieService.delete('googleID');
      // this.cookieService.delete('loggedIn');
      // this.cookieService.delete('avatarUrl');

      console.log(this.authService.getLoggedIn(), this.authService.getGoogleID(), this.authService.getAvatarUrl());
      return
    }
    
  }

}
