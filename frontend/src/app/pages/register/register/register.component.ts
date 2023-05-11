import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { BagelCard } from 'src/app/models/bagelCard';
import { COURSES } from 'src/app/models/courses';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs/operators';
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
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      // ['image'] 
    ],
  }; 
  courses = COURSES;
  bagelCard: BagelCard = {
    title: '', 
    text: '',
    category: '',
    username: '',
    avatarUrl: '',
    term: '',
    course: ''
  };
  
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _cardservice: CardService,
    private authService: AuthService
    ) {
  }
  
  ngOnInit(): void {
    const state = window.history.state;
    this.bagelCard = state && (state.currentBagel || state.newBagel) || this.bagelCard;
    // 위의 코드에서는 window.history.state에 값이 있을 경우, currentBagel 또는 newBagel 속성 중 하나의 값을 bagelCard에 할당합니다. 만약 window.history.state가 undefined인 경우, this.bagelCard의 초기값을 사용합니다.
    this.saveType = this.bagelCard._id && 'EDIT' || 'REGISTER';
    console.log(this.bagelCard._id);
    console.log(state);

    // user 정보 불러오기
    this.userData();
  }
  
  selectCategory() {
    let categorySelect = (document.getElementById('selectCategory')) as HTMLSelectElement;
    let selected = categorySelect.selectedIndex;
    let selectedValue = categorySelect.options[selected].value;
    this.isEnabled = selectedValue === 'InAachen' || selectedValue === 'AfterRWTH';
  }
  bagelSave() {
    if(this.saveType === 'REGISTER') {
    this._cardservice.create(this.bagelCard).subscribe({
      next: (res) => {
        console.log(this.bagelCard.text);
        this.toastr.success('saved successfully :D', 'new Post');
        this.router.navigate(['']);
      },
      error: (e) => console.error(e)
    });
    } else if (this.saveType === 'EDIT') {
      this._cardservice.update(this.bagelCard._id, this.bagelCard).subscribe({
        next: (data) => {
          this.bagelCard = data;
          console.log(this.bagelCard.text);
          this.toastr.success('updated successfully :)', 'Post');
          this.router.navigate(['']);
        },
        error: (e) => console.error(e)
      });
    }
  }
  bagelDelete() {
    this.toastr.warning('please here click', 'If you really want to delete it,')
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
  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    console.log('editor got changed', event);
  }

  async userData() {
    const username = await this.authService.getUsername();
    this.bagelCard.username = username;

    const avatarUrl = await this.authService.getAvatarUrl()
    this.bagelCard.avatarUrl = avatarUrl;
    return
  }
}
