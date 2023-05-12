import { Component, OnInit, Input } from "@angular/core";

import { CommentService } from "../../../services/comment.service";
import { Comment } from "../../../models/comment.model";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"],
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  avatarUrl: string;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.commentService.followComments().subscribe((comments => {
      this.comments = comments;
    }));
  }
}

