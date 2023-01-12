import { Component, OnInit } from '@angular/core';
import { Course, COURSES, CATEGORIES } from '../../../models/courses';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {
  categories = CATEGORIES;
  courses: Course[] = COURSES.filter(courses => courses.category === '1 Semester');
  selected: string;
  
  constructor() { }

  ngOnInit(): void {
  }

  selectCategory(data: string) {
    this.courses = COURSES.filter(courses => courses.category === data + 'ester');
    this.selected = data;
    console.log(this.selected);
  }

}
