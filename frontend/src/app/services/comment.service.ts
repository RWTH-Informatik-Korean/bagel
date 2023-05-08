import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private cardUrl: string = "http://localhost:8080/card";
  private commentUrl: string = "http://localhost:8080/comment";
  
  constructor(
    private _http: HttpClient
  ){}

  private comments: Comment[] = [];

  // Observerble comments
  private commentsSubject: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);

  setComments(comments: Comment[]): void {
    this.comments = [...this.comments, ...comments];
    this.commentsSubject.next(this.comments); // 구독하는 옵저버들에게 값 전달
    console.log('서비스의 코멘트 자료', this.comments);
  }
  pullComment(id: string): void {
    const commentToUpdate = this.comments.find(comment => comment._id === id);

    if (commentToUpdate) {
      commentToUpdate.text = "삭제 되었습니다.";

      const updatedComments = this.comments.map(comment => {
        if (comment._id === id) {
          return commentToUpdate;
        }
        return comment;
      });
      this.comments = updatedComments;
      // TODO: consol 지울 것
      console.log(this.comments);
    }
  }
  getComments(): Comment[] {
    return this.comments;
  }
  followComments() {
    return this.commentsSubject.asObservable()
  }
  

  // get all comment via cardID
  getAllComments(id:string): Observable<any> {
    return this._http.get(`${this.cardUrl}/${id}/comments`);
  }

  // create comment
  createComment(comment: Comment) {
    const body = { text: comment.text, avatarUrl: comment.avatarUrl };
    const cardId = comment.cardId;
    return this._http.post(`${this.cardUrl}/${cardId}/comment`, body, { withCredentials: true });
  }

  // delete comment
  deleteComment(id: string) {
    const commentId = id;
    console.log('코멘트 삭제');
    return this._http.delete(`${this.commentUrl}/${commentId}`);
  }
}
