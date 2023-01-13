import { Component, OnInit, Input, SimpleChange, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PostcategoryFilterService } from '../../../services/postcategory-filter.service';
import { SearchService } from 'src/app/services/search.service';
import { BagelCard } from '../../../models/bagelCard';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  
  @Input() postCategory: string;
  @Input() searchText: string;
  @Input() isSearch: boolean;
  @Output() currentBagelId: string;
  bagels: BagelCard[]; 
  noResult: boolean
  
  constructor(
    private _filterservice: PostcategoryFilterService,
    private _searchservice: SearchService,
    public router: Router
  ) {}
  
  ngOnInit() {
    this._filterservice.getAllData().subscribe({
      next: (data) => {
        this.bagels = data;
      },
      error: (e) => console.log(e)
    });
  }
  ngOnChanges(change: SimpleChange) {
    if(this.searchText && !this.postCategory) {
      this._searchservice.searchCard(this.searchText).subscribe(res => {
        this.bagels = res;
        this.noResult = res.length === 0 ? true : false;
      });
      this.router.navigate(['search']);
    } else if(this.searchText && this.postCategory) {
      this._filterservice.findBySearchCategory(this.searchText, this.postCategory)
        .subscribe(res => { 
          this.bagels = res;
          this.noResult = res.length === 0;
      });
      
    }
    if(this.postCategory && !this.searchText) {
      this._filterservice.findByCategory(this.postCategory).subscribe(res => {
        this.bagels = res;
      });
    }
  } 
  showDetail(id: string) {
    this.router.navigate(['/card',id], { skipLocationChange: true });
  }
}
