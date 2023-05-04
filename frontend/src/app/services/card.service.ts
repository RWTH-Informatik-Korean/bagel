import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BagelCard } from '../models/bagelCard';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cardsUrl = 'http://localhost:8080/cards/list';
  private cardUrl = 'http://localhost:8080/card';
  
  constructor(private _http: HttpClient) { }
  
  getAllData(): Observable<BagelCard[]> {
    return this._http.get<BagelCard[]>(this.cardsUrl);
   }
  
  get(_id: string): Observable<object> {
    return this._http.get(`${this.cardUrl}/${_id}`);
  }

  create(data: any): Observable<any> {
    return this._http.post(this.cardUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this._http.put(`${this.cardUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this._http.delete(`${this.cardUrl}/${id}`);
  }
  
  searchCard (search: string): Observable<BagelCard[]> {
    console.log(search);
    return this._http.get<BagelCard[]>("http://localhost:8080/cards", {
      params: new HttpParams().set('search', search)
    });
  }
  
  findByCategory(postCategory: string): Observable<BagelCard[]> {
    return this.getAllData().pipe(map((items: any[]) => 
      items.filter((item: { category: string; }) => 
        item.category === postCategory)))
  }
  
  findBySearchCategory(searchText: string, postCategory: string): Observable<BagelCard[]> {
    return this.searchCard(searchText).pipe(map((items: any[]) => 
      items.filter((item: { category: string; }) => 
        item.category === postCategory)))
  }
  findByCourse(_course: string): Observable<BagelCard[]> {
    console.log(_course);
    return this._http.get<BagelCard[]>("http://localhost:8080/cards", {
      params: new HttpParams().set('course', _course)
    });
  }
}
