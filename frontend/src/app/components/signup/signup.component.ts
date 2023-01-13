import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Signup2Component } from '../signup2/signup2.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email: string = '';
  warningMsg: string = 'example';
  verifiFailed: boolean = false; 

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    public auth: AuthService,
    public router: Router,
    public matDialog: MatDialog,
    ) { }

  ngOnInit(): void {
  } 

  closeModal() {
    this.dialogRef.close();
  }

  verificationEmail(){
    console.log(this.email);
    this.auth.verificationEmail(this.email).subscribe(data => {
      console.log(data);
      console.log(data.status);
      if(data.message === `${this.email}으로 인증번호를 전송 하였습니다.`){
        this.closeModal();
        this.openSignup2Modal();
      } else {
        this.warningMsg = data.message;
        this.verifiFailed = true;
      }
      this.auth.updateEmail(this.email);
    }
    )
  }

  openSignup2Modal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "signup2-component";
    dialogConfig.height = "600px";
    dialogConfig.width = "800px";
    dialogConfig.data = this.email;
    const modalDialog = this.matDialog.open(Signup2Component, dialogConfig);
  }

}
