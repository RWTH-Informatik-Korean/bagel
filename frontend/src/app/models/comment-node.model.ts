import { User } from '../models/user.model';
import { Card } from '../models/card.model';


/** Class representing a Comment */
export class CommentNode {
  // cardId: Card['cardId'] = '';
  // userName: User["userName"] = '';
  // userPictureUrl: User["userPictureUrl"] = '';
  // timeStamp: Date = new Date();
  text: string = '';
  isOpened: boolean = false;
  // answer: CommentNode[] = [];

  /**
   * Create a comment
   * @param userName - name of user who wrote this comment
   * @param userPictureUrl - picture url of user who wrote this comment
   * @param text - text the user wrote in
   * @param timeStamp - time the user wrote
   * 
   * Add param later: User.photo, User.nickname
   */
  constructor (text: string) {
    // this.userName = userName;
    // this.userPictureUrl = userPictureUrl;
    // this.timeStamp = timeStamp;
    this.text = text;
  }

  /**
   * Add new comment object to answer-array
   * @param answer - Array of CommentNode 
   * @param newComment - CommentNode object which wrote by writing comment
   */
  addComment = ((answer: CommentNode[] ,newComment: CommentNode) => {
      answer.push(newComment);
  });

  /**
   * Remove a comment object from answer-array
   * @param newComment - CommentNode object in answer-array
   */
  removeComment = ((answer: CommentNode[] ,Comment: CommentNode) => {
    let index = this.answer.indexOf(Comment);
    // ~index: if this index exist in array
    if (~index) {
      answer.splice(index, 1);
    }
  });

   /**
   * Edit the comment object in answer-array
   * @param newComment - CommentNode object in answer-array
   * @param editText - text edited which was already worte before
   */
  editComment = ((Comment: CommentNode, editText: string) => {
    let index = this.answer.indexOf(Comment);
    if (~index) {
      this.answer[index].text = "(edited)  " + editText;
    }
  })
}
