import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email: string = '';

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    public auth: AuthService
    ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

  verificationEmail(){
    this.auth.verificationEmail(this.email).subscribe(data => {
      console.log(data);
    }
    )
  }

}
