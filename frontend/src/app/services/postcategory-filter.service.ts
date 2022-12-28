import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, find, map } from 'rxjs';
import { bagelCard } from '../models/bagelCard';

@Injectable({ providedIn: 'root' })
export class PostcategoryFilterService {

  private cardsUrl = 'http://localhost:8080/cards/list';
  
  constructor(private _http: HttpClient) { }

  getAllData(): Observable<bagelCard[]> {
   return this._http.get<bagelCard[]>(this.cardsUrl);
  }
  
  findByCategory(postCategory: string): Observable<bagelCard[]> {
    return this.getAllData().pipe(map((items: any[]) => 
      items.filter((item: { category: string; }) => 
        item.category === postCategory)))
  }
}
