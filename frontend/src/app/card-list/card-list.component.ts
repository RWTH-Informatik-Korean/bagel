import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { PostcategoryFilterService } from '../services/postcategory-filter.service';
import { bagelCard } from '../models/bagelCard';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  
  @Input() postCategory: string ;

  bagels: bagelCard[];  
  searched: boolean = false;  
  
  constructor(private _filterservice:PostcategoryFilterService) {
  }
  
  ngOnInit() {
    this._filterservice.getAllData().subscribe(res => { 
      this.bagels = res; 
    })
  }
  
  ngOnChanges(change: SimpleChange) {
    console.log(this.postCategory);
    this._filterservice.findByCategory(this.postCategory).subscribe(res => {
      this.bagels = res;
    })
  }
}
