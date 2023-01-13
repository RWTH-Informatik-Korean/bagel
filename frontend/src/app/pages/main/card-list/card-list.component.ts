import { Component, OnInit, Input, SimpleChange, Output } from '@angular/core';
import { PostcategoryFilterService } from '../../../services/postcategory-filter.service';
import { BagelCard } from '../../../models/bagelCard';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  
  @Input() postCategory: string;
  @Output() currentBagelId: string;

  bagels: BagelCard[];  
  searched: boolean = false;  
  
  constructor(private _filterservice:PostcategoryFilterService) {
  }
  
  ngOnInit() {
    this._filterservice.getAllData().subscribe({
      next: (data) => {
        this.bagels = data;
      },
      error: (e) => console.log(e)
    });
  }
  
  ngOnChanges(change: SimpleChange) {
    console.log(this.postCategory);
    this._filterservice.findByCategory(this.postCategory).subscribe(res => {
      this.bagels = res;
    })
  }
  
  setActiveBagel(bagel: BagelCard) {
    this.currentBagelId = bagel._id;
  }
}
