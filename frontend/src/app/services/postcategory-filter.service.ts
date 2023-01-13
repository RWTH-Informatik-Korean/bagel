import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BagelCard } from '../models/bagelCard';

@Injectable({ providedIn: 'root' })
export class PostcategoryFilterService {

  private cardsUrl = 'http://localhost:8080/cards/list';
  
  constructor(private _http: HttpClient) { }

  getAllData(): Observable<BagelCard[]> {
   return this._http.get<BagelCard[]>(this.cardsUrl);
  }
  
  findByCategory(postCategory: string): Observable<BagelCard[]> {
    return this.getAllData().pipe(map((items: any[]) => 
      items.filter((item: { category: string; }) => 
        item.category === postCategory)))
  }
}
