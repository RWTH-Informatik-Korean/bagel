import { Component, Input } from '@angular/core';

import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  // isCommentInEditMode: if the current comment is in the edit mode or not
  isCommentInEditMode: boolean = false;
  // isDropdowClick: boolean = false;

  @Input() comment: Comment;
  @Input() index: number;
  @Input() comments: Comment[];


  editComment(): void {
    this.isCommentInEditMode = true;
  }

  deleteComment(): void {
    this.comments = this.comments.splice(this.index, 1);
  }

  disableCommentEditMode(isEditMode: boolean) {
    this.isCommentInEditMode = isEditMode;
  }

  // dropdownClick(): void {
  //   this.isDropdowClick = !this.isDropdowClick;
  //   console.log(this.isDropdowClick);
  // }




}
