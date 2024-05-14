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

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  checkSid(): boolean {
    const sid = this.cookieService.get('connect.sid');
    if (sid) return true;
    return false;
  }

  // Setter, Getter for Auth-data
  // user id from DB
  private userIDSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.getUserID());
  
  setUserID(_id: string) {
    const userIDEncrypt = CryptoJS.AES.encrypt(_id, environment.CRYPTOKEY);
    localStorage.setItem('userID', userIDEncrypt.toString());
    this.userIDSubject.next(_id);
    this.cookieService.delete('_id');
  }
  getUserID(): string {
    const userID = localStorage.getItem('userID');  
    
    if (userID) {
      const decryptValue = CryptoJS.AES.decrypt(userID, environment.CRYPTOKEY).toString(CryptoJS.enc.Utf8);
    return decryptValue;
    }
    return null;
  }
  userID(): Observable<string> {
    return this.userIDSubject.asObservable();
  }

  // google id of user
  private googleIDSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.getGoogleID());
  
  setGoogleID(googleID: string) {
    const googleIDEncrypt = CryptoJS.AES.encrypt(googleID, environment.CRYPTOKEY);
    localStorage.setItem('googleID', googleIDEncrypt.toString());
    this.googleIDSubject.next(googleID);
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


  // username from user
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.getUsername());

  setUsername(username: string) {
    const usernameEncrypt = CryptoJS.AES.encrypt(username, environment.CRYPTOKEY);
    localStorage.setItem('username', usernameEncrypt.toString());
    this.usernameSubject.next(username);
    this.googleIDSubject.next(username);
    this.cookieService.delete('username');
  }
  getUsername(): string {
    const username = localStorage.getItem('username');  
    
    if (username) {
      const decryptValue = CryptoJS.AES.decrypt(username, environment.CRYPTOKEY).toString(CryptoJS.enc.Utf8);
    return decryptValue;
    }
    return null;
  }
  username(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  // user avatar url
  private avatarUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.getAvatarUrl());

  setAvatarUrl(avatarUrl: string) {
    const avatarUrlEncrypt = CryptoJS.AES.encrypt(avatarUrl, environment.CRYPTOKEY);
    localStorage.setItem('avatarUrl', avatarUrlEncrypt.toString());
    this.avatarUrlSubject.next(avatarUrl);
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
    this.cookieService.delete('googleLoggedIn');
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
    this.cookieService.delete('sentCode');

    // verification code는 1분 후에 소멸되므로 localStorage에서도 자동 소멸되게 함
    setTimeout(() => {
      localStorage.removeItem('sentCode');
    }, 60000);
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
    this.cookieService.delete('verified');
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
  setLoggedOut() {
    this.loggedInSubject.next(false);
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



  // Verification rwth email
  // send the verification code to the email user entered in input
  verificationEmail (email: string) {
    const body = { email };
    // observe: 'response' - 특정 헤더 정보나 status code 확인을 위해 전체 응답을 받는 옵션
    return this.http.post<any>(`${this.verificationUrl}/send`, body, { observe: 'response', withCredentials: true }); 
  }

  // Validate verification code
  validateCode(email: string, verifiCode: string, userID: string) {
    const body = { email, verifiCode, userID };
    return this.http.post<any>(`${this.verificationUrl}/check`, body, { observe: 'response', withCredentials: true });
    }

  // Update DB for User information  - rwthVerified: true
  updateDBVerified(rwthVerified: boolean) {
    const body = rwthVerified;
    return this.http.post<any>(`${this.verificationUrl}/google/update/verified`, body, { observe: 'response', withCredentials: true });
  }

  // Get AvatarUrl via username
  getAvatar(username: string) {
    const body = username;
    return this.http.get<any>(`${this.authUrl}/avatar`, { withCredentials: true });
  }
  // Update user information - username, avatarUrl
  updateUser(data: any): Observable<any> {
    const options = { withCredentials: true };
    return this.http.put(`${this.authUrl}/google/update`, data, options);
  }
  // Duplication check for username
  usernameDuplicate(username: string)  {
    return this.http.get(`${this.authUrl}/google/duplicate/${username}`, { withCredentials: true });
  }

  // Log out
  logoutUser() {
    return this.http.get(`${this.authUrl}/logout`, { withCredentials: true });
  }
}
