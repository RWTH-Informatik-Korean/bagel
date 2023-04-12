import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bagel';
  screenMode: string;
  
  constructor(
    private scroller: ViewportScroller,
    private router: Router,
  ) {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }
  
  @HostListener ('window:resize', ['$event'])
  onResize(event: any) {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }
  scrollToTop() {
    this.scroller.scrollToPosition([0, 0]);
  }
  plusNewCard() {
    this.router.navigate(['/register']);
  }
}
