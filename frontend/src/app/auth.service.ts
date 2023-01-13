import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private email$: string = '';
  private googleId$: string = '';
  private avatarUrl$: string = '';

  constructor(
    private http: HttpClient
    ){}
  verificationEmail(email: string){
    console.log(email);
    return this.http.post<any>(`${url}/verification/send`, { email });
  }

  verificationCode(email: string, verifiCode: string){
    return this.http.post<any>(`${url}/verification/check`, { email, verifiCode });
  }

  saveUsername(googleId: string, username: string, avataUrl: string){
    return this.http.post<any>(`${url}/auth/google/update`, { googleId, username, avataUrl});
  }

  updateEmail(email: string){
    this.email$ = email
  }
  
  getEmail(){
    return this.email$;
  }

  getGoogleId(){
    return this.googleId$;
  }

  getAvatarUrl(){
    return this.avatarUrl$;
  }
}
