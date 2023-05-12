import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  // Google - google id / google OAuth logged in or not
  userID: string = '';
  googleLoggedin: boolean = false;
  avatarUrl: string = '';
  // RWTH Email Verification - rwth email / verification code / email verified or not  
  rwthEmail: string = '';  // email-address from the input
  verificationCode: string = '';  // verification code received in email
  sentCode: boolean = false;  // verification code sent successfully or not
  verified: boolean = false;  // Verification of RWTH email successfully or not 

  loginhref: string = "http://localhost:8080/auth/login/google";


  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private cookieService: CookieService
    ) {}

  ngOnInit(): void {
    this.loginCheck();
  }

  // 가입 상태 확인하는 fucntion
  async loginCheck() {
    if (this.authService.getLoggedIn()) {
      this.router.navigate(['/']);
      return
    }
    else if (this.authService.getGoogleLoggedIn() && !this.authService.getVerified()) {
      const googleLoggedInPassport = await this.cookieService.get('googleLoggedIn');
      const userIDPasport = await this.cookieService.get('_id');
      const avatarUrl = await this.cookieService.get('avatarUrl');

      if (googleLoggedInPassport)  this.authService.setGoogleLoggedIn();
      if (userIDPasport) this.authService.setUserID(userIDPasport);
      if (avatarUrl) this.authService.setAvatarUrl(avatarUrl);


      await this.authService.isGooglLoggedIn().subscribe(googleLoggedin => {
        this.googleLoggedin = googleLoggedin;
      })
      await this.authService.isSentCode().subscribe(sentCode => {
        this.sentCode = sentCode;
      })
      await this.authService.isVerified().subscribe(verified => {
        this.verified = verified;
      })
      return
    }
    return
  } 


  // Verification rwth email
  verificationEmail(email: string) {
    const verifyEmail$ = this.authService.verificationEmail(email);
    
    verifyEmail$.subscribe(res => {
      if (res.status === 200) {
        this.sentCode = true;
        this.authService.setSentCode();
        // pop up msg for success
        this.toastr.info('', 'Verification code has been sent.', {
          timeOut: 60000,  // pop up displayed time
          progressBar: true,
          positionClass: 'toast-top-center',
        });
      }
    },
    // error 발생 시 메시지 pop up (이미 코드를 요청한 경우 / 이미 인증된 메일인 경우)
    error => {
      // pop up msg for error
      this.toastr.error('', `${error.error.message}`, {
        positionClass: 'toast-top-center',
      });
    });
  }

  // Validate verification code
  validateCode(code: string) {
    const validateCode$ = this.authService.validateCode(this.rwthEmail, code, this.authService.getUserID());

    validateCode$.subscribe(res => {
      if (res.status === 200) {

        // rwth verification 인증됨 update
        this.verified = true;
        this.authService.setVerified();
        this.authService.setLoggedIn();
        // rwth verification 인증됨 DB user information update
        this.authService.updateDBVerified(true);

        // remove popup for verification code previously triggered
        this.toastr.clear();
        // pop up for verification success
        this.toastr.success('', 'Hey! Welcome to Bagel.', {
          timeOut: 5000,  // pop up displayed time
          positionClass: 'toast-top-center',
        });

        this.router.navigate(['/']);
      }
    },
    // error 발생 시 메시지 pop up (이미 인증된 메일인 경우 / 인증 시간 초과 / 코드 불일치)
    error => {
      // pop up msg for error
      this.toastr.error('', `${error.error.message}`, {
        positionClass: 'toast-top-center',
      });
    });
  }

}
