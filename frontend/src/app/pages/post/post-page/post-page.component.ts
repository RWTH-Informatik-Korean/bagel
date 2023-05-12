import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { BagelCard } from '../../../models/bagelCard';
import { CardService } from '../../../services/card.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs/operators';
import { Card } from 'src/app/models/card.model';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  bagel: BagelCard = {};
  comments: Comment[] = [];
  isMy: boolean = true;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private cardService:CardService,
    private authService: AuthService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.getBagel(this.route.snapshot.params['cardId']);

    this.commentService.followComments().subscribe((comments => {
      this.comments = comments;
    }));
  }

  // 작성자와 현재 user가 일치하는지 검사
  async isMyCard() {
    const cardUsername = await this.bagel.username;
    const username = await this.authService.getUsername();

    return this.isMy = (cardUsername === username);
  }

  gotoCards() {
    this.commentService.clearComments();
    this.router.navigate(['/home']);
  }
  getBagel(_id: string): void {
    this.cardService.setCardID(_id);

    this.cardService.get(_id)
      .subscribe({
        next: (data) => {
          this.bagel = data;
          // card id에 따른 comments get + assigns to this.comments
          this.commentService.getAllComments(this.bagel._id).subscribe({
            next: (res) => {
              this.commentService.setComments(res);
            }
          })
          this.isMyCard();
        },
        error: (e) => console.error(e)
      });
  }
  bagelUpdate() {
    const navigationExtras: NavigationExtras = {
      state: {
        currentBagel: this.bagel
      }
    };
    this.router.navigate(['/register'], navigationExtras);
  }
  bagelDelete() {
    this.toastr.warning('여기를 클릭해주세요 !', '삭제를 원하면')
      .onTap
      .pipe(take(1))
      .subscribe(() => this.trueDelete()
    );
  }
  trueDelete() {
    this.cardService.delete(this.bagel._id).subscribe({
        next: (res) => {
          this.toastr.success('', 'Post has been deleted.');
          this.router.navigate(['']);
        },
        error: (e) => console.error(e)
      });
  }

  // Comment관련 함수
  addComment(newComment: Comment) {
    this.comments.push(newComment);
  }
}
