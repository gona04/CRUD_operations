import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable()
export class PostsService {
  posts: Post[] = [];
  postsUpadted: Subject<Post[]> = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  setPost(post: Post) {
    this.http.post('http://localhost:3000/api/posts', post)
    .subscribe((data:any) => {
      console.log(data);
      post.id = data.postId;
      console.log(post);
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
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map(postData => {
      return postData.posts.map((post:any) => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      })
    }))
    .subscribe((transformedPosts:any) => {
      this.posts = transformedPosts;
      console.dir(transformedPosts);
      this.postsUpadted.next(this.posts);
    })
  }

  postDeleteBackend(id: string) {
    this.http.delete("http://localhost:3000/api/posts/"+id).subscribe(result => {
      const updatedPosts = this.posts.filter(post => post.id !== id);
      this.posts = updatedPosts;
      this.postsUpadted.next(this.posts);
    })
  }

  getPostById(id: string | null): Post | undefined {
    const post = this.posts.find(p => p.id === id);
    return post ? { ...post } : undefined;
  }

  updatePostBackend(id: string, title: string, content: string) {
    const post: Post =  {id: id, title: title, content: content};

  }
}
