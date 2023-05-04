import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Course, COURSES, CATEGORIES, LEHRSTUHLE } from '../../../models/courses';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {
  
  @Output() SelectedCourse = new EventEmitter<string>;
  categories = CATEGORIES;
  courses: Course[] = COURSES.filter(courses => courses.category === '1 Sem');
  lehrsthule = LEHRSTUHLE;
  selected: string;
  
  constructor() { }

  ngOnInit(): void {
  }
  @HostListener ('window:resize', ['$event'])
  onResize(event: any) {
    let screenWidth = window.innerWidth;
  }
  selectCategory(data: string) {
    this.courses = COURSES.filter(courses => courses.category === data );
    this.selected = data;
  }
  selectedCourse(course: any) {
    this.SelectedCourse.emit(course);
    console.log(course);
  }
}
