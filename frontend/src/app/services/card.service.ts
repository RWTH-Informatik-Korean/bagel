import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { BagelCard } from '../models/bagelCard';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardListUrl = 'http://localhost:8080/cards/list';
  private cardsUrl = 'http://localhost:8080/cards';
  private cardUrl = 'http://localhost:8080/card';
  private cardId: string;

  constructor(private _http: HttpClient){}

  private cardIDSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.getCardID());

  setCardID(cardID: string) {
    this.cardId = cardID;
    this.cardIDSubject.next(cardID);
  }
  getCardID() {
    return this.cardId;
  }
  cardID(): Observable<string> {
    return this.cardIDSubject.asObservable();
  }
  
  getAllData(): Observable<BagelCard[]> {
    return this._http.get<BagelCard[]>(this.cardListUrl, { withCredentials: true });
   }
  
  get(_id: string): Observable<object> {
    return this._http.get(`${this.cardUrl}/${_id}`, { withCredentials: true });
  }

  create(data: BagelCard): Observable<any> {
    const body = { title: data.title, text: data.text, category: data.category, avatarUrl: data.avatarUrl, term: data.term, course: data.course }
    return this._http.post(this.cardUrl, body, { withCredentials: true });
  }

  update(id: string, data: any): Observable<any> {
    return this._http.put(`${this.cardUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: any): Observable<any> {
    return this._http.delete(`${this.cardUrl}/${id}`, { withCredentials: true });
  }

  filterCards(filter: any[]): Observable<BagelCard[]> {
    return this.getAllData().pipe(map(items => {
        return this.varFilter(items, filter);
      })
    );
  }
  varFilter(items: BagelCard[], filter: { filterType: string, filterText: string }[]): any[] {
    if (filter.length === 0) {
      return items;
    }
    return items.filter(item => {
      const lastFilter = filter[filter.length - 1];
      const { filterType, filterText } = lastFilter;
      if (filterText === 'All') {
        return items;
      }
      if (filterType === 'postCategory') {
        return item.category && item.category === filterText;
      }
      if (filterType === 'searchText') {
        return item.title && item.title.toLowerCase().includes(filterText.toLowerCase());
      }
      if (filterType === 'getCourse') {
        return item.course && item.course === filterText;
      }
      return true;
    })
  }
// 지금은 사용안하지만 추가 어떤 문제가 나올지 모르니까 일단 삭제 보류
  // findBySearchCategory(searchText: string, postCategory: string): Observable<BagelCard[]> {
  //   return this.searchCard(searchText).pipe(map((items: any[]) => 
  //     items.filter((item: { category: string; }) => 
  //       item.category === postCategory)))
  // }
  // searchCard (search: string): Observable<BagelCard[]> {
  //   // console.log(search);
  //   return this._http.get<BagelCard[]>(this.cardsUrl, {
  //     params: new HttpParams().set('search', search)
  //   });
  // }
  // findByCategory(postCategory: string): Observable<BagelCard[]> {
  //   // console.log(postCategory);
  //   return this._http.get<BagelCard[]>(this.cardsUrl, {
  //     params: new HttpParams().set('category', postCategory)
  //   });
  // }
  // findByCourse(_course: string): Observable<BagelCard[]> {
  //   // console.log(_course);
  //   return this._http.get<BagelCard[]>(this.cardsUrl, {
  //     params: new HttpParams().set('course', _course)
  //   });
  // } 

}

