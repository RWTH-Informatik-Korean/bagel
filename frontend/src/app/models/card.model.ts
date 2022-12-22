export class Card {
  cardId: string; // card id
  userName: string;  // user nickname
  userPictureUrl: string;  // URL for user profile photo (optional)  
  category: string;  // category of card
  semester: string;  // semester (type: Semester)
  course: string;  // name of course (type: Course)
  title: string;  // title of card 
  content: string;  // content of card
  numComment: number;  // number of comments
  numView: number;  // number
  constructor(
    cardId: string, userName: string, userPictureUrl: string, category: string, semester: string, course: string, title: string, content: string, numComment: number, numView: number){
      this.cardId = cardId;
      this.userName = userName;
      this.userPictureUrl = userPictureUrl;
      this.category = category;
      this.title = title;
      this.content = content;
      this.numComment = numComment;
      this.numView = numView;
    }
}
