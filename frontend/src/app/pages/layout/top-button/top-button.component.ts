import { DOCUMENT, isPlatformServer, ViewportScroller } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, OnInit, Output } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd } from '@angular/router';
import { debounce, debounceTime, fromEvent, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-top-button',
  templateUrl: './top-button.component.html',
  styleUrls: ['./top-button.component.scss']
})
export class TopButtonComponent {
  
  @Output() TopButton = new EventEmitter();
  
  windowScrolled = false;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }
  
  scrollToTop() {
    this.TopButton.emit();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } 
    else if (this.windowScrolled && window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop < 10) { 
      this.windowScrolled = false;
    }
  } 
}


