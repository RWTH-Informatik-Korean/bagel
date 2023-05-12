import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Course, COURSES, CATEGORIES, LEHRSTUHLE } from '../../../models/courses';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  isLoggedIn: boolean = false;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe({
      next: (loggedIn) => {
        this.isLoggedIn = loggedIn;
      }
    });
  }
  @HostListener ('window:resize', ['$event'])
  onResize(event: any) {
    let screenWidth = window.innerWidth;
  }
  selectCategory(data: string) {
    if (data === 'Archive') {
      if (!this.isLoggedIn) {
        this.router.navigate(['/login'])
      }
      this.courses = COURSES.filter(courses => courses.category === data );
      this.selected = data;
    }
    this.courses = COURSES.filter(courses => courses.category === data );
    this.selected = data;
  }
  selectedCourse(course: any) {
    this.SelectedCourse.emit(course);
  }
}
