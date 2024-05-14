import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  
  selectedCategory: string;
  selectedCourse: string;
  selectCourse: boolean;
  inputtedText: string;
  searched: boolean;
  screenMode: string;

  constructor(
    private scroller: ViewportScroller,
  ) {}
  
  ngOnInit(): void {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }

  scrollToTop() {
    this.scroller.scrollToPosition([0, 0]);
  }
  changePostCategory(postCategory: string) {
    this.selectedCategory = postCategory;
  }
  searchText(text: string) {
    this.inputtedText = text;
    this.searched = this.inputtedText!=='';
  }
  getCourseBagel(course: string) {
    this.selectedCourse = course;
    this.selectCourse = true;
  }
  @HostListener ('window:resize', ['$event'])
  onResize(event: any) {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }
}
