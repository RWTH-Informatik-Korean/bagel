import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private verificationUrl = 'http://localhost:8080/verification';
  private authUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  // 1. Verification rwth email
  // send the verification code to the email user entered in input
  verificationEmail (email: string) {
    const body = { email };
    // observe: 'response' - 특정 헤더 정보나 status code 확인을 위해 전체 응답을 받는 옵션
    return this.http.post<any>(`${this.verificationUrl}/send`, body, { observe: 'response' }); 
  }

  // 2. Validate verification code
  validateCode(email: string, verifiCode: string) {
    const body = { email, verifiCode };
    return this.http.post<any>(`${this.verificationUrl}/check`, body, { observe: 'response' });
    }

  // 3. Google signup
  googleSignup() {
    return this.http.get<any>(`${this.authUrl}/signup/google`);
  }

  googleLogin() {
    return this.http.get<any>(`${this.authUrl}/login/google`);
  }

}
