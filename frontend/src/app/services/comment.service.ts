import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  comments: Comment[] = [
    {
      id: 1,
      text: "This is the first comment",
      avatarUrl: ""
    },
  ];

  getAllComments(): Observable<Comment[]> {
    return of(this.comments);
  }

  postComment(commentId: number, commentText: string, commentAvatarUrl: string): Observable<Comment | undefined> {
    const isNewComment: boolean = commentId === null || commentId === undefined;
    const newComment: Comment = {
      id: this.comments.length + 1,
      text: commentText,
      avatarUrl: commentAvatarUrl
    };

    
    if (isNewComment) { // add new Comment into comment array
      this.comments.push(newComment);
      return of(newComment); //'of' operator from RxJS convert comments data to an obseverble
    } else { // edit exist Comment (find and edit)
      this.comments = this.comments.map((comment) => 
        comment.id === commentId ? { ...comment, text: commentText} : comment
      );
      const updatedComment = this.comments.find((comment) => comment.id === commentId);
      return of(updatedComment);
    }
  }
}
