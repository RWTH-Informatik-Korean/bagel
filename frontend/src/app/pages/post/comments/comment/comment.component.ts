import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment.model';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit{
  isCommentInEditMode: boolean = false;
  myComment: Comment = {}
  isWriter: boolean = false;
  deletedComment: boolean = false;
  @Input() comment: Comment;

  constructor(
    private authService: AuthService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.myComment = this.comment;
    this.authCheck();
    this.deletedCheck();
  }

  async authCheck() {
    const username = await this.authService.getUsername();
    if (this.myComment.username === username && !(this.myComment.text == "삭제 되었습니다.")) {
      return this.isWriter = true;
    }
    return this.isWriter = false;
  }

  async deletedCheck() {
    if (this.myComment.text == "삭제 되었습니다.") {
      return this.deletedComment = true;
    }
    return this.deletedComment = false;
  }

  async deleteComment() {
    this.commentService.deleteComment(this.myComment._id).subscribe({
      next: (res) => {
        this.commentService.pullComment(this.myComment._id);
        this.deletedComment = true;
      }
    })
  }
}
