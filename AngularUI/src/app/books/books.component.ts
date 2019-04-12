import { Component, OnInit } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { Book } from "../book";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent{
  configUrl:'http://localhost:3000/readCategories';
  books: Book;
  Title: string;
  constructor(private http:HttpClient) {


    //this.category = this.http.get(this.configUrl)
    }

    private extractData(res: Response) {
      let body = res;
      return body || { };
    }

    getProducts(): Observable<any> {
      return this.http.get(this.configUrl);
    }
  addToCart(){
    console.log(this.getProducts());

    // let cartId = localStorage.getItem('cartId');
    // console.log('This cart id = '+cartId); //test

    //make if sttmt
    //if cart not exists - create
    //then add to cart

    //if exists
    //add to cart
  }
}
