import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AVATARS } from './avatar';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit{
       
  @Output() closeSideNav = new EventEmitter();
  navMode: string = 'default';
  avatars = AVATARS;
  curUser = {
    userId: '',
    googleID: '',
    username: '',
    avatarUrl: '',
    rwthVerified: false,
  }
  updatedAvatarUrl: string;
  updateErrorMsg: string;

  constructor( 
    private _authService: AuthService, 
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  
  ngOnInit(): void {
    this.authSet();
	}

  async authSet() {
    if (this.cookieService.get('username') && this.cookieService.get('avatarUrl')) {
      this.curUser.username = await this.cookieService.get('username');
      this.curUser.avatarUrl = await this.cookieService.get('avatarUrl');
    } else {
      this.curUser.username = this._authService.getUsername();
      this.curUser.avatarUrl = this._authService.getAvatarUrl();
    }
  }

  onToggleClose(): void {
    this.navMode = 'default';
    this.closeSideNav.emit();
  }
  changeViewMode() {
    if(this.navMode=='default') {
      this.navMode = 'edit';
    } else {
      this.navMode = 'default';
    }
  }
  changeAvatar(imageObject: { avatarUrl: string; }) {
    this.curUser.avatarUrl = imageObject.avatarUrl;
  }  
  updateUser() {
    // validate length of username
    if (this.curUser.username.length < 2 || this.curUser.username.length > 8) {
      this.toastr.error('', `Must be between 2-8 characters`, {
        positionClass: 'toast-top-right',
      });
      return
    }
    // validate duplication of username
    this._authService.usernameDuplicate(this.curUser.username).subscribe( async (data: any) => {
      const dupCheck = await data;
      if (!dupCheck.duplicate) {
        this._authService.updateUser(this.curUser)
        .subscribe({
          next: async (updatedUser) => {
            this.curUser = await updatedUser;    
            this._authService.setAvatarUrl(updatedUser.avatarUrl);
            this._authService.setUsername(updatedUser.username);

            this.navMode = 'default';
          },
           error: (error) => {
            // pop up msg for error
            return this.toastr.error('', `${error.error.message}`, {
            positionClass: 'toast-top-right',
          });
          }
        });
      } else {
        this.toastr.error('', `This usename is already in use.`, {
          positionClass: 'toast-top-right',
        });
        return;
      }
    });
  }

  signOut() {
    this.toastr.warning('to Log out', 'Click here !')
      .onTap
      .pipe(take(1))
      .subscribe(() => {
        this._authService.logoutUser();
        this.onToggleClose();
        localStorage.clear();
        this.cookieService.deleteAll();
        this._authService.setLoggedOut();
        this.router.navigate(['/']);
      }
    );
    
  }
}
