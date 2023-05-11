import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})

export class CommentFormComponent implements OnDestroy {
  private postCommentSubscription: Subscription = new Subscription();

  @Output() commentEditModeChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() isCommentInEditMode: boolean = false;
  @Input() comment: Comment;
  @Input() comments: Comment[];
  @Input() index: number;

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.postCommentSubscription.unsubscribe();
  }

  postComment(form: NgForm, commentId?: number) {
    const commentText: string = form.value.commentBox;
    const avatarUrl: string = this.authService.getAvatarUrl();

    if (
      form.valid &&
      commentText !== '' &&
      commentText !== undefined &&
      commentText !== null
    ) {
      this.postCommentSubscription.add(
        this.commentService.postComment(commentId, commentText, avatarUrl).subscribe({
          next: (updatedComment) => {
            if (this.index) {
              this.comments[this.index].text = updatedComment?.text;
            }
            form.resetForm();
          },
        })
      );
    }
    this.isCommentInEditMode = false;
    this.commentEditModeChanged.emit(false);
  }
}
