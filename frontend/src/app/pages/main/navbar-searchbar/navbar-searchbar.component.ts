import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CATEGORIES } from '../../../models/post-category';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-navbar-searchbar',
  templateUrl: './navbar-searchbar.component.html',
  styleUrls: ['./navbar-searchbar.component.scss']
})
export class NavbarSearchbarComponent implements OnInit {
  @Output() SelectedCategory = new EventEmitter<string>();
  categories = CATEGORIES;
  
  searchInput: string;
  doubbleSubmit: boolean = false;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }
  
  selectedPostCategory(category: string) {
    this.SelectedCategory.emit(category);
  }

  searchCard () {
    if(this.searchInput === undefined) {
      return console.log("Input some keyword...")
    } else {
        if (this.doubbleSubmit) {
          this.doubbleSubmit = false;
          return
        } else {
          this.doubbleSubmit = true;
          return this.searchService.searchCard(this.searchInput);
       }
    }
  }


}
