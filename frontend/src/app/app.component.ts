import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

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
    private cookieService: CookieService,
    private location: Location
  ) {
    let screenWidth = window.innerWidth;
    this.screenMode = (screenWidth > 767) ? "W" : "M";
    // TODO: 5.18 변경
    // (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }

  ngOnInit(): void {
    this.authSet();
    this.loginCheck();
  }

  
  @HostListener ('window:resize', ['$event'])
  onResize(event: Event) {
    let screenWidth = window.innerWidth;
    this.screenMode = (screenWidth > 767) ? "W" : "M";
  }
  // TODO: 5.18 변경
  // onResize(event: any) {
  //   let screenWidth = window.innerWidth;
  //   (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  // }
  
  // postpage에서 browser의 back button을 눌렀을 때, bagel home 이전으로 redirect되는 문제를 해결하기 위함
  // Angular에서 browser의 back button이 실행되면 popstate가 실행되며, 이걸 감지하여 home에 머무르도록 처리함
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.router.navigate(['/home']);
  }
  scrollToTop() {
    this.scroller.scrollToPosition([0, 0]);
  }
  plusNewCard() {
    if (this.authService.getLoggedIn()) {
      return this.router.navigate(['/register']);
    }
    return this.router.navigate(['/login']);
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
    
    // Seesion이 만료된 경우, logout 실행
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
