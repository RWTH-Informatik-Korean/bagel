import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupUsernameComponent } from './signup-username.component';

describe('SignupUsernameComponent', () => {
  let component: SignupUsernameComponent;
  let fixture: ComponentFixture<SignupUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupUsernameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
