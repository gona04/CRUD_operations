import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PostsService {
  posts: Post[] = [];
  postsUpadted: Subject<Post[]> = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  setPost(post: Post) {
    this.http.post('http://localhost:3000/api/posts', post).subscribe((data:any) => {
      console.log(data.message);
      console.log('Answer got');
      this.posts.push(post);
      this.postsUpadted.next([...this.posts]);
    }, (error: any) => {
      console.error('Error:', error);
    })
  }

  getUpdatedPosts() {
    return this.postsUpadted.asObservable();
  }

  getPostsFromBackend() {
    console.log('get backend called');
    this.http.get('http://localhost:3000/api/posts').subscribe((data:any) => {
      this.posts = data.posts;
      console.dir(data);
      this.postsUpadted.next(this.posts);
    })
  }
}
