import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent {
  public categories  = [];
  constructor(private http: HttpClient) {
  }

  getCategories(){
    this.http.get('http://localhost:3000/readCategories').subscribe((response : any[]) => {
      console.log(response);
      this.categories = response});
  }

}
