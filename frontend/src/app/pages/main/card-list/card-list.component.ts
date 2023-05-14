import { Component, OnInit, Input, SimpleChange, Output, HostListener, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BagelCard } from '../../../models/bagelCard';
import { CardService } from 'src/app/services/card.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  
  @Input() postCategory: string;
  @Input() searchText: string;
  @Input() isSearch: boolean;
  @Input() getCourse: string;
  @Output() currentBagelId: string;  
  bagels: BagelCard[]; 
  bagel: BagelCard = {};
  noResult: boolean;
  numResult: number;
  screenMode: string;
  category: string;
  filterItems: any[] = [{ filterType: '', filterText: ''}]
  lastFilter: any;

  constructor(
    private _cardservice: CardService,
    private router: Router,
    private authService: AuthService
  ) {}
  
  loadInitBagel() {
    this._cardservice.getAllData().subscribe({
      next: (data) => { this.bagels = data; },
      error: (e) => console.log(e)
    });
  }
  filterBagel() {   
    this._cardservice.filterCards(this.filterItems).subscribe({
      next: res => {
        this.bagels = res;
        this.noResult = res.length === 0 ? true : false;
        this.numResult = res.length;
    }});
  }
  ngOnInit() {
    let screenWidth = window.innerWidth;
    (screenWidth > 576) ? this.screenMode = "W" : this.screenMode = "M";
    this.loadInitBagel();
  }
  
  @HostListener ('window:resize', ['$event'])
  onResize(event: any) {
    let screenWidth = window.innerWidth;
    (screenWidth > 576) ? this.screenMode = "W" : this.screenMode = "M";
  }
  @HostListener('change')
  ngOnChanges(change: SimpleChange) {
    this.lastFilter = change;
    const keys = Object.keys(this.lastFilter);
    const lastKey = keys[keys.length-1];
    const lastCurrentValue = this.lastFilter[lastKey].currentValue;
    this.filterItems.push({ filterType: keys[keys.length - 1], filterText: lastCurrentValue});
    this.filterBagel(); 
  } 
  async newBagel() {
    const loggedIn = await this.authService.getLoggedIn();
    if (loggedIn) {
      const navigationExtras: NavigationExtras = {
        state: { currentBagel: this.bagel }
      };
      this.router.navigate(['/register'], navigationExtras);
      return
    }
    this.router.navigate(['/login']);
  }
  
  showDetail(id: string) {
    this.router.navigate(['/card',id]);

  }
}
