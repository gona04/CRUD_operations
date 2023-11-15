import { Component, OnInit } from "@angular/core";
import { Post } from "../../post.model";
import { PostsService } from "../../posts.services";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit{
  posts:Post[] = [];

  constructor(private _postsService: PostsService) {}

  ngOnInit(): void {
    this._postsService.getPostsFromBackend();
    this.getAllPosts();
  }

  getAllPosts() {
    this._postsService.getUpdatedPosts().subscribe(data => {
      this.posts = data;
    })
  }
}
