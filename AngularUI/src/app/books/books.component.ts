import { Component, OnInit } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { Book } from "../book";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GETService } from '../services/get.service';
import { POSTService } from '../services/post.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent {
  categories$;
  books$;
  constructor(private getService: GETService) {
    this.categories$ = getService.getCategories();
    this.books$ = getService.getBooks();
   }



    // let cartId = localStorage.getItem('cartId');
    // console.log('This cart id = '+cartId); //test

    //make if sttmt
    //if cart not exists - create
    //then add to cart

    //if exists
    //add to cart

}
