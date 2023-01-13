import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedBtnComponent } from './rounded-btn.component';

describe('RoundedBtnComponent', () => {
  let component: RoundedBtnComponent;
  let fixture: ComponentFixture<RoundedBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundedBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundedBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
