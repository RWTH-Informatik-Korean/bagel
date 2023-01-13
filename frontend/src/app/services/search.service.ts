import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchCard (search: string) {
    this.http.get("http://localhost:8080/cards", {
      params: new HttpParams().set('search', search)
    }).subscribe(event => {
      console.log(event);
    });
  }
}
