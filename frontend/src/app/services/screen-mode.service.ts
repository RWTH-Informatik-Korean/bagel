import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenModeService {
  
  screenMode: string;
  
  constructor() {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }
  
  @HostListener ('window:resize', ['$event'])
  onResize(event: any) {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }
  
}
