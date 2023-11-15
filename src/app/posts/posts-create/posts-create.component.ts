import { Component, EventEmitter, Output } from "@angular/core";
import { Post } from "../post.model";
import { PostsService } from "../posts.services";

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostCreateComponent {

  enteredTitle = '';
  enteredContent = '';

  constructor(private _postsService: PostsService) {}

  onAddPost() {
    console.dir(this.enteredContent);
    const post: Post = {
      id: '1',
      title: this.enteredTitle,
      content: this.enteredContent
    }
    this._postsService.setPost(post)
  }
}
