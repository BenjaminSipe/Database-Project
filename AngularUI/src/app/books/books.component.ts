import { Component, OnInit } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { Book } from "../book";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent{
  books: Book;
  Title: string;
  constructor(private http:HttpClient) {
    this.http.get<Book>('http://localhost:3000/getbooks').subscribe(response => {
      this.books = response;
      this.Title = this.books.Title;

      console.log(response);
    })

    }

  addToCart(){
    let cartId = localStorage.getItem('cartId');
    console.log('This cart id = '+cartId); //test
    //make if sttmt
    //if cart not exists - create
    //then add to cart

    //if exists
    //add to cart
  }
}
