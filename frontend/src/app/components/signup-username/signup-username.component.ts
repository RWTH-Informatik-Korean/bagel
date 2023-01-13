import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-signup-username',
  templateUrl: './signup-username.component.html',
  styleUrls: ['./signup-username.component.scss']
})
export class SignupUsernameComponent {
  username: string;
  googleId: string;
  avatarUrl: string;

  constructor(
    public dialogRef: MatDialogRef<SignupUsernameComponent>,
    public auth: AuthService,
    ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

  saveUsername(){
    this.googleId = this.auth.getEmail();
    this.avatarUrl = this.auth.getAvatarUrl();
    this.auth.saveUsername(this.googleId, this.username, this.avatarUrl).subscribe(data => {
      console.log(data);
    })
  }

}
