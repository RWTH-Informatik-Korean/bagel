import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { CommentService } from "../../../services/comment.service";
import { Comment } from "../../../models/comment.model";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent implements OnInit {
  comments: Comment[];
  avatarUrl: string;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.commentService.followComments().subscribe((comments => {
      this.comments = comments;
    }));
  }
}

