import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSearchbarComponent } from './navbar-searchbar.component';

describe('NavbarSearchbarComponent', () => {
  let component: NavbarSearchbarComponent;
  let fixture: ComponentFixture<NavbarSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarSearchbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
