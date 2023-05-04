import { Component, OnInit, Input, SimpleChange, Output, HostListener } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BagelCard } from '../../../models/bagelCard';
import { CardService } from 'src/app/services/card.service';

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
  screenMode: string;
  category: string;
  
  constructor(
    private _cardservice: CardService,
    public router: Router
  ) {}
  
  ngOnInit() {
    let screenWidth = window.innerWidth;
    (screenWidth > 576) ? this.screenMode = "W" : this.screenMode = "M";

    this._cardservice.getAllData().subscribe({
      next: (data) => {
        this.bagels = data;
      },
      error: (e) => console.log(e)
    });
  }
  @HostListener ('window:resize', ['$event'])
  onResize(event: any) {
    let screenWidth = window.innerWidth;
    (screenWidth > 576) ? this.screenMode = "W" : this.screenMode = "M";
  }

  newBagel() {
    const navigationExtras: NavigationExtras = {
      state: {
        currentBagel: this.bagel
      }
    };
    this.router.navigate(['/register'], navigationExtras);
  }
  @HostListener('change')
  ngOnChanges(change: SimpleChange) {
    if (this.searchText) {
      console.log(this.searchText);
      this._cardservice.searchCard(this.searchText).subscribe(res => {
        this.bagels = res;
        this.noResult = res.length === 0 ? true : false;
      });
    } else {
      switch (this.postCategory) {
        case null:
        case undefined:
        case 'All':
          this._cardservice.getAllData().subscribe({
            next: (data) => {
              this.bagels = data;
            },
            error: (e) => console.log(e)
          });
          break;
        default:
          this._cardservice.findByCategory(this.postCategory).subscribe(res => {
            this.bagels = res;
          });
          break;
      }
    }
    if(this.postCategory && this.searchText) {
      if(this.postCategory === 'All') {
        this._cardservice.searchCard(this.searchText).subscribe(res => {
          this.bagels = res;
          this.noResult = res.length === 0 ? true : false;
        });
      } else {
        this._cardservice.findBySearchCategory(this.searchText, this.postCategory).subscribe(res => { 
          this.bagels = res;
          this.noResult = res.length === 0;
        });
      }
    }
    if(this.getCourse) {
      this._cardservice.findByCourse(this.getCourse).subscribe({next: (res) => {
        console.log(this.getCourse);
        this.bagels = res;
      },
      error: (e) => console.log(e)})
    }
  } 
  showDetail(id: string) {
    this.router.navigate(['/card',id], { skipLocationChange: true });
  }
}
