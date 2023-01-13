import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.scss']
})
export class Signup2Component implements OnInit {

  email: string;
  verifiCode: string;
  warningMsg: string = 'example';
  verifiFailed: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<Signup2Component>,
    public auth: AuthService,
    public matDialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.email = this.auth.getEmail();
  }

  closeModal() {
    this.dialogRef.close();
  }

  verificationCode(){
    console.log(this.email);
    this.auth.verificationCode(this.email, this.verifiCode).subscribe(data => {
      if(data.message === '인증에 성공 했습니다.'){
        this.closeModal();
        this.openLoginModal();
      } else {
        this.warningMsg = data.message;
        this.verifiFailed = true;
      }
    })
  }

  openLoginModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "login-component";
    dialogConfig.height = "600px";
    dialogConfig.width = "800px";
    const modalDialog = this.matDialog.open(LoginComponent, dialogConfig);
  }

}
