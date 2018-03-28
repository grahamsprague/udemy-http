import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];


  constructor(private service: PostService ) {
  }

  ngOnInit() {
    // console.log('OnInit is running.');
    this.service.getPosts()
      .subscribe(
        response => {
          this.posts = response.json();
      },
        (error: Response) => {
          alert('Unable to Delete Post An unexpected error occurred.');
      });
  }



  createPost(input: HTMLInputElement) {
    console.log('input value:' + input.value);
    const post = {
      title: input.value,
      body: 'this is a test',
      userId: 1
    };
    this.service.createPost(post)
      .subscribe(
        response => {
          post['id'] = response.json().id;
          this.posts.splice(0, 0, post);
      },
        error => {
          alert('Unable to Create Post. An unexpected error occurred.');
      });
  }

  updatePost(post) {
    // update only the fields that change
    this.service.updatePost(post)
    .subscribe(
      response => {
        console.log(response);
    },
      error => {
        alert('Unable to Add Post. An unexpected error occurred.');
    });
  }
  deletePost(post) {
    this.service.deletePost(post)
    .subscribe(
      response => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
    },
    (error: Response) => {
      if ( error.status === 404 ) {
        alert('Unable to Delete Posts. This post has already been deleted.');
      } else {
        alert('Unable to Delete Post An unexpected error occurred.');
      }
    });
  }

}
