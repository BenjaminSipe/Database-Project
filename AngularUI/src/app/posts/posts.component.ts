import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent {

  constructor(http: HttpClient) {
    http.get('https://jsonplaceholder.typicode.com/posts').subscribe(response => {
      console.log(response);
    });
  }

}
