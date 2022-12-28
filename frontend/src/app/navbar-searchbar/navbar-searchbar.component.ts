
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'app-navbar-searchbar',
  templateUrl: './navbar-searchbar.component.html',
  styleUrls: ['./navbar-searchbar.component.scss']
})
export class NavbarSearchbarComponent implements OnInit {
  searchInput: string;


  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  searchCard () {
    if(this.searchInput === undefined) {
      return console.log("Input some keyword...")
    } 
    this.searchService.searchCard(this.searchInput);
  }


}
