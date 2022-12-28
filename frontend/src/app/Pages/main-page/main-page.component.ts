import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  selectedCategory: string;

  constructor(
    private scroller: ViewportScroller
  ) {}
  
  ngOnInit(): void {}
  
  scrollToTop() {
    this.scroller.scrollToPosition([0, 0]);
  }

  changePostCategory(postCategory: string) {
    this.selectedCategory = postCategory;
  }
}
