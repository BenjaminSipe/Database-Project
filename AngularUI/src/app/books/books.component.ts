import { Component, OnInit } from '@angular/core';
import { HttpClient } from  "@angular/common/http";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent{
  books:string;

  constructor(private http:HttpClient) {
    this.configUrl = 'http://localhost:3000/getbooks';
    this.books = this.http.get(this.configUrl)

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
