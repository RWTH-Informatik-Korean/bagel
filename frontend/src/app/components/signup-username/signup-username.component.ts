import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-signup-username',
  templateUrl: './signup-username.component.html',
  styleUrls: ['./signup-username.component.scss']
})
export class SignupUsernameComponent {


  constructor(public dialogRef: MatDialogRef<SignupUsernameComponent>) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
