import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { CATEGORIES } from '../../../models/post-category';

@Component({
  selector: 'app-navbar-searchbar',
  templateUrl: './navbar-searchbar.component.html',
  styleUrls: ['./navbar-searchbar.component.scss']
})
export class NavbarSearchbarComponent implements OnInit {
  
  @Input() isCourse: boolean;
  @Input() isSearch: boolean;
  @Output() SelectedCategory = new EventEmitter<string>();
  @Output() InputtedText = new EventEmitter<string>();
  @ViewChild('searchBox') searchBox!: ElementRef;

  categories = CATEGORIES;
  selected: string;
  searchInput: string;
  doubbleSubmit: boolean = false;

  constructor(
    private _cardService: CardService, 
    public router: Router) { }

  ngOnInit(): void {
    this.selected = 'All';
  }
  
  selectedPostCategory(category: string) {
    this.SelectedCategory.emit(category);
    this.selected = category;
  }

  searchCard() {
    this.InputtedText.emit(this.searchInput);
    if (this.searchInput === undefined) {
      console.log("Input some keyword...");
    } else if (this.searchInput.trim() === '') {
      this.InputtedText.emit(this.searchInput);
    } else {
      this.InputtedText.emit(this.searchInput);
      if (this.doubbleSubmit) {
        this.doubbleSubmit = false;
        return
      } else {
        this.doubbleSubmit = true;
      }
    }
  }
}
