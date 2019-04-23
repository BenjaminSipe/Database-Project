import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Book } from '../book';
import { GETService } from '../services/get.service';
import { POSTService } from '../services/post.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.sass']
})
export class BookCardComponent implements OnInit{
  @Input('book') book;
  format$;
  category$;
  publisher$;
  author$;
  book$;
  subscription : Subscription;

  constructor(private getService : GETService, private postService: POSTService,
              private cart : ShoppingCartService) {
  }
  ngOnInit() {
    //console.log("from on init " + this.book.BookID);
    this.format$ = this.getService.getBookFormat(this.book.BookID);
    this.category$ = this.getService.getBookCategory(this.book.BookID);
    this.author$ = this.getService.getBookAuthor(this.book.BookID);
    this.book$ = this.getService.getBook(this.book.BookID);
  }


  addToCart(book){
  console.log("adding..");
  this.cart.addItemsToCart(book);
  const cartTotal: number = localStorage.getItem('selectedProducts')
  ? parseFloat(localStorage.getItem('selectedProductsCount')) : 0;
  this.cartTotal = cartTotal;
  console.log('Cart total in component = ' + this.cartTotal);
  }
}
