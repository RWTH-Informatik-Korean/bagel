import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CATEGORIES } from '../../../models/post-category';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-navbar-searchbar',
  templateUrl: './navbar-searchbar.component.html',
  styleUrls: ['./navbar-searchbar.component.scss']
})
export class NavbarSearchbarComponent implements OnInit {
  @Output() SelectedCategory = new EventEmitter<string>();
  @Output() InputtedText = new EventEmitter<string>();
  
  categories = CATEGORIES;
  
  searchInput: string;
  doubbleSubmit: boolean = false;
  screenMode: string;

  constructor(
    private searchService: SearchService, 
    public router: Router) { }

  ngOnInit(): void {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }
  selectedPostCategory(category: string) {
    this.SelectedCategory.emit(category);
  }
  searchCard() {
    this.InputtedText.emit(this.searchInput);
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
  @HostListener ('window:resize', ['$event'])
  onResize(event: any) {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }
}
