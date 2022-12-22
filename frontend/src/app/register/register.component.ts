import { Component, HostBinding, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isEnabled: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  
  selectCategory() {
    let categorySelect = (document.getElementById('selectCategory')) as HTMLSelectElement;
    let selected = categorySelect.selectedIndex;
    let selectedValue = categorySelect.options[selected];
    selectedValue.value==='community' ? this.isEnabled = true : this.isEnabled = false;
  }
  
}