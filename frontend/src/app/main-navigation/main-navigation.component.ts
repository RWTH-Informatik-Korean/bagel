import { Component, OnInit } from '@angular/core';
import { Course, Category, COURSES, CATEGORIES } from '../models/courses';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {
  
  categories = CATEGORIES;
  courses = COURSES;
  
  constructor() { }

  ngOnInit(): void {
  }

}
