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

  post: Post = {id: '', content: '', title: ''};
  mode!: PostMode;
  private postId!: string | null;

  constructor(private _postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = PostMode.EDIT;
        this.postId = paramMap.get('postId');
        this.post = this._postsService.getPostById(this.postId) || {} as Post;
      } else {
        this.mode = PostMode.CREATE;
        this.postId = null;
      }
    });
  }


  onAddPost() {
    console.dir(this.post);
    this._postsService.setPost(this.post);
  }

  onUpdatePost() {
    console.dir(this.post.content+ "FROM EDIT");
    this._postsService.updatePostBackend(this.post)
  }

  get postMode(): typeof PostMode {
    return PostMode;
  }

}
