import { Component, OnInit } from "@angular/core";
import { Post } from "../post.model";
import { PostsService } from "../posts.services";
import { ActivatedRoute, ParamMap } from "@angular/router";

enum PostMode {
  CREATE = "create",
  EDIT = "edit"
}

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  private postId!: string | null;
  mode!: PostMode;
  private post!: Post;

  constructor(private _postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = PostMode.EDIT;
        this.postId = paramMap.get('postId');
        this.post = this._postsService.getPostById(this.postId) || {} as Post;
        this.setForEdit();
      } else {
        this.mode = PostMode.CREATE;
        this.postId = null;
      }
    });
  }

  setForEdit() {
    this.enteredContent = this.post.content;
    this.enteredTitle = this.post.title;
  }

  onAddPost() {
    console.dir(this.enteredContent);
    const post: Post = {
      id: '1',
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this._postsService.setPost(post);
    this.enteredContent = "";
    this.enteredTitle = "";
  }

  onUpdatePost() {
    console.dir(this.enteredContent);
    // Implement the logic for updating the post
  }

  get postMode(): typeof PostMode {
    return PostMode;
  }

}
