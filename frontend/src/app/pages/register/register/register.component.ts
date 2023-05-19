import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { BagelCard } from 'src/app/models/bagelCard';
import { COURSES } from 'src/app/models/courses';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  avatarUrl: string;
  saveType: string = '';
  isMy: boolean = true;
  isEnabled: boolean = false;
  isCategorySelected: boolean = false;

  quillConfig = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],        
      ['blockquote', 'code-block'],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'color': ['#000', '#b2bec3', '#FFF', '#ee5133', '#0984e3', '#00b894'] }
        , { 'background': ['#f0cb92', '#fd79a8', '#34e7e4','#dfe6e9']}],
      // ['image'] 
    ]
  };
  courses = COURSES;
  bagelCard: BagelCard = {
    title: '', 
    text: '',
    category: '',
    term: ' ',
    course: ' ',
    username: '',
    avatarUrl: ''
  };
  
  constructor (
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _cardservice: CardService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    const state = window.history.state;
    this.bagelCard = state && (state.currentBagel || state.newBagel) || this.bagelCard;
    // 위의 코드에서는 window.history.state에 값이 있을 경우, currentBagel 또는 newBagel 속성 중 하나의 값을 bagelCard에 할당합니다. 만약 window.history.state가 undefined인 경우, this.bagelCard의 초기값을 사용합니다.
    this.saveType = this.bagelCard._id && 'EDIT' || 'REGISTER';

    // username, avatarUrl 불러오기 + bagelCard에 각각 할당
    this.userData();
  }

  selectCategory() {
    this.isCategorySelected = true;
    let categorySelect = (document.getElementById('selectCategory')) as HTMLSelectElement;
    let selected = categorySelect.selectedIndex;
    let selectedValue = categorySelect.options[selected].value;
    this.isEnabled = selectedValue === 'InAachen' || selectedValue === 'AfterRWTH';
  }
  bagelSave() {
    if(this.saveType === 'REGISTER') {
      if (!this.isCategorySelected) {
        this.toastr.error('', `Category must be selected.`, {
          positionClass: 'toast-top-center',
        });
        return
      }
      this._cardservice.create(this.bagelCard).subscribe({
          next: (res) => {
            this.toastr.success('saved successfully :D', 'New Post');
            this.router.navigate(['']);
          },
          error: (e) => console.error(e)
        });
        } else if (this.saveType === 'EDIT') {
          this._cardservice.update(this.bagelCard._id, this.bagelCard).subscribe({
            next: (data) => {
              this.bagelCard = data;
              this.toastr.success('updated successfully :)', 'Post');
              this.router.navigate(['']);
            },
            error: (e) => console.error(e)
        });
    }
  }
  bagelDelete() {
    this.toastr.warning('to Delete', 'Click here !')
      .onTap
      .pipe(take(1))
      .subscribe(() => this.trueDelete()
    );
  }
  trueDelete() {
    this._cardservice.delete(this.bagelCard._id).subscribe({
        next: (res) => {
          this.toastr.success('', 'Post has been deleted.');
          this.router.navigate(['']);
        },
        error: (e) => console.error(e)
      });  
  }
  changedEditor(event: any) {
    // console.log('editor got changed', event);
  }

  async userData() {
    const username = await this.authService.getUsername();
    this.bagelCard.username = username;

    const avatarUrl = await this.authService.getAvatarUrl()
    this.bagelCard.avatarUrl = avatarUrl;
  }
}
