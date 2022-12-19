import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Output() SideNavToggle = new EventEmitter();

  isLoggedIn: boolean = false;

  login(): void{
    this.isLoggedIn = !this.isLoggedIn;
  }

  openSidenav() {
    this.SideNavToggle.emit();
  }

  constructor() {}

  ngOnInit(): void {
      
  }

}
