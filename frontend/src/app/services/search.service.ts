import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { BagelCard } from '../models/bagelCard';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  bagels: BagelCard[];
  
  constructor(private http: HttpClient) { }

  searchCard (search: string): Observable<BagelCard[]> {
    return this.http.get<BagelCard[]>("http://localhost:8080/cards", {
      params: new HttpParams().set('search', search)
    });
  }
}
