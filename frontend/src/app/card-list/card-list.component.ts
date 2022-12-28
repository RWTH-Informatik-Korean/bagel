import { Component, HostListener, OnInit } from '@angular/core';
import { BAGELS } from '../models/mock-bagelCard';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  bagels = BAGELS;
  searched: boolean = false;  
    
  constructor() { }

  ngOnInit(): void {
  }  

}
