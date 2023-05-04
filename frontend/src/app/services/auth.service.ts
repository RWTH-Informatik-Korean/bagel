import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private verificationUrl = 'http://localhost:8080/verification';
  private authUrl = 'http://localhost:8080/auth';

  // Setter, Getter for Auth-data
  // google id from user
  private googleIDSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.getGoogleID());

  setGoogleID(googleID: string) {
    const googleIDEncrypt = CryptoJS.AES.encrypt(googleID, environment.CRYPTOKEY);
    localStorage.setItem('googleID', googleIDEncrypt.toString());
    this.googleIDSubject.next(googleIDEncrypt.toString());
    this.cookieService.delete('googleID');
  }
  getGoogleID(): string {
    const googleID = localStorage.getItem('googleID');  
    
    if (googleID) {
      const decryptValue = CryptoJS.AES.decrypt(googleID, environment.CRYPTOKEY).toString(CryptoJS.enc.Utf8);
    return decryptValue;
    }
    return null;
  }
  googleID(): Observable<string> {
    return this.googleIDSubject.asObservable();
  }

  // user avatar url
  private avatarUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.getAvatarUrl());

  setAvatarUrl(avatarUrl: string) {
    this.avatarUrlSubject.next(avatarUrl);
    const avatarUrlEncrypt = CryptoJS.AES.encrypt(avatarUrl, environment.CRYPTOKEY);
    localStorage.setItem('avatarUrl', avatarUrlEncrypt.toString());
    this.cookieService.delete('avatarUrl');
  }
  getAvatarUrl(): string {
    const avatarUrl = localStorage.getItem('avatarUrl');  
    
    if (avatarUrl) {
      const decryptValue = CryptoJS.AES.decrypt(avatarUrl, environment.CRYPTOKEY).toString(CryptoJS.enc.Utf8);
    return decryptValue;
    }
    return null;
  }
  avatarUrl(): Observable<string> {
    return this.avatarUrlSubject.asObservable();
  }

  // state of google log in
  private googleLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getGoogleLoggedIn());

  setGoogleLoggedIn() {
    const trueEncrypt = CryptoJS.AES.encrypt('true', environment.CRYPTOKEY);
    localStorage.setItem('googleLoggedIn', trueEncrypt.toString());
    this.googleLoggedInSubject.next(true);
  }
  getGoogleLoggedIn(): boolean {
    const googleLoggedIn = localStorage.getItem('googleLoggedIn');  
    
    if (googleLoggedIn) {
      const decryptValue = CryptoJS.AES.decrypt(googleLoggedIn, environment.CRYPTOKEY).toString(CryptoJS.enc.Utf8);
    return Boolean(decryptValue);
    }
    return false;
  }
  isGooglLoggedIn(): Observable<boolean> {
    return this.googleLoggedInSubject.asObservable();
  }
  

  // state of sending code for rwth email verification  
  private sentCodeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getSentCode());

  setSentCode() {
    const trueEncrypt = CryptoJS.AES.encrypt('true', environment.CRYPTOKEY);
    localStorage.setItem('sentCode', trueEncrypt.toString());
    this.sentCodeSubject.next(true);
  }
  getSentCode(): boolean {
    const sentCode = localStorage.getItem('sentCode');  
    
    if (sentCode) {
      const decryptValue = CryptoJS.AES.decrypt(sentCode, environment.CRYPTOKEY).toString(CryptoJS.enc.Utf8);
    return Boolean(decryptValue);
    }
    return false;
  }
  isSentCode(): Observable<boolean> {
    return this.sentCodeSubject.asObservable();
  }


  // state of rwth email verification
  private verifiedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getVerified());

  setVerified() {
    const trueEncrypt = CryptoJS.AES.encrypt('true', environment.CRYPTOKEY);
    localStorage.setItem('verified', trueEncrypt.toString());
    this.verifiedSubject.next(true);
  }
  getVerified(): boolean {
    const verified = localStorage.getItem('verified');  
    
    if (verified) {
      const decryptValue = CryptoJS.AES.decrypt(verified, environment.CRYPTOKEY).toString(CryptoJS.enc.Utf8);
    return Boolean(decryptValue);
    }
    return false;
  }
  isVerified(): Observable<boolean> {
    return this.verifiedSubject.asObservable();
  }

  // state of Bagel login
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getLoggedIn());

  setLoggedIn() {
    const trueEncrypt = CryptoJS.AES.encrypt('true', environment.CRYPTOKEY);
    localStorage.setItem('bagelLoggedIn', trueEncrypt.toString());
    this.loggedInSubject.next(true);
    this.cookieService.delete('loggedIn');
  }
  getLoggedIn(): boolean {
    const logggedIn = localStorage.getItem('bagelLoggedIn');  
    
    if (logggedIn) {
      const decryptValue = CryptoJS.AES.decrypt(logggedIn, environment.CRYPTOKEY).toString(CryptoJS.enc.Utf8);
    return Boolean(decryptValue);
    }
    return false;
  }
  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }


  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }


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

  // 3. Update DB for User information  - rwthVerified: true
  updateDBVerified(rwthVerified: boolean) {
    const body = rwthVerified;
    return this.http.post<any>(`${this.verificationUrl}/google/update/verified`, body, { observe: 'response' });
  }

}
