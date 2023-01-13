import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bagel';
  
  constructor(
    private scroller: ViewportScroller
  ) {}

  
  scrollToTop() {
    this.scroller.scrollToPosition([0, 0]);
  }

}
