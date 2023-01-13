import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
    ){}
  verificationEmail(email: string){
    console.log(email);
    return this.http.post<any>(`${url}/verification/send`, { email });
  }

  verificationCode(email: string, code: string){
    return this.http.post<any>(`${url}/verification/check`, { email, code });
  }

  saveUsername(username: string){
    this.http.post<any>(`${url}/verification/check`, { username });
  }
}
