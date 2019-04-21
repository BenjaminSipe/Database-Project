import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { Book } from "../book";
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GETService } from '../services/get.service';
import { POSTService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnDestroy{
  books : {Title : string}[];
  filteredBooks : any[];
  categories$;
  books$;
  category: string;
  subscription : Subscription;
  constructor(private getService: GETService, route: ActivatedRoute) {
    this.categories$ = getService.getCategories();
    this.books$ = getService.getBooks();
    this.subscription = this.getService.getBooks()
    .subscribe(books => this.filteredBooks = this.books = Object.values(books));
    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      console.log(this.category);
      if(this.category){
        console.log("in if...")
        this.subscription = this.getService.getBooksByCategory(this.category)
        .subscribe(books => {console.log(Object.values(books));
          this.filteredBooks = Object.values(books)});

      } else if (this.category === null) {
        this.subscription = this.getService.getBooks()
        .subscribe(books => this.filteredBooks = this.books = Object.values(books));
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query : string){

    this.filteredBooks = (query) ?
    this.books.filter(b => b.Title.toLowerCase().includes(query.toLowerCase())) :
    this.books;
       }


    // let cartId = localStorage.getItem('cartId');
    // console.log('This cart id = '+cartId); //test

    //make if sttmt
    //if cart not exists - create
    //then add to cart

    //if exists
    //add to cart

}
