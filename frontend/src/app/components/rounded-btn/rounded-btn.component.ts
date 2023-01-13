import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rounded-btn',
  templateUrl: './rounded-btn.component.html',
  styleUrls: ['./rounded-btn.component.scss']
})
export class RoundedBtnComponent implements OnInit {

  @Input('btnType') btnType!: string;
  @Input('btnText') btnText!: string;
  @Input('btnClick') btnClick!: void;
  
  constructor() { }

  ngOnInit(): void {
  }

}
