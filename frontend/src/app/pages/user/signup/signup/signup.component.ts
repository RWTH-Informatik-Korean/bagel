import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../../../services/user.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  rwthEmail: string;  // email-address from the input
  verificationCode: string;  // verification code received in email
  sentCode: boolean;  // verification code sent successfully or not 
  verified: boolean;  // Verification of RWTH email successfully or not 

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.rwthEmail = "";  // intiallize mail address
    this.verificationCode =""; // intiallize verification code 
    this.sentCode = false;
    this.verified = false;
  }

  // Verification rwth email
  verificationEmail(email: string) {

    const verifyEmail$ = this.userService.verificationEmail(email);

    verifyEmail$.subscribe(res => {
      // TODO: console.log 지울 것
      console.log(res.status);
      console.log(res);
      if (res.status === 200) {
        this.sentCode = true;
      }
    },
    error => {
      // TODO: console.log 지울 것
      // TODO: error 발생 시, 화면 메시지 출력 설정
      console.log(error.status); 
      console.log(error.error);
    });
  }

  // Validate verification code
  validateCode(code: string) {
    // TODO: console.log 지울 것
    console.log(this.rwthEmail, code);
    const validateCode$ = this.userService.validateCode(this.rwthEmail, code);

    validateCode$.subscribe(res => {
      // TODO: console.log 지울 것
      console.log(res.status);
      console.log(res);
      if (res.status === 200) {
        console.log('verification success!')
        window.location.href = 'http://localhost:8080/auth/login/google';
      }
    },
    error => {
      // TODO: console.log 지울 것
      // TODO: error 발생 시, 화면 메시지 출력 설정
        console.log(error.status);
        console.log(error.error);
    });
  }
}
