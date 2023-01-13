import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private email$: string = '';

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

  saveUsername(username: string){
    this.http.post<any>(`${url}/verification/check`, { username });
  }

  updateEmail(email: string){
    this.email$ = email
  }
  
  getEmail(){
    return this.email$;
  }
}
