import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';

@Component({
  selector: 'app-plus-button',
  templateUrl: './plus-button.component.html',
  styleUrls: ['./plus-button.component.scss']
})
export class PlusButtonComponent {
  @Output() PlusButton = new EventEmitter();
  
  windowScrolled = false;

  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }
  
  plusNewCard() {
    this.PlusButton.emit();
  }
}
