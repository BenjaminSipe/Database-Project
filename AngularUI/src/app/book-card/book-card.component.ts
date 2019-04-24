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
  cartTotal;
  format$;
  category$;
  publisher$;
  author$;
  book$;
  bookPrice: any;
  subscription : Subscription;
  bookToCart = {
    BookID: "int",
    Title: "string",
    ImageLink: "",
    price: 20,
    quantity: 20
  };

  constructor(private getService : GETService, private postService: POSTService,
              private cart : ShoppingCartService) {
                //console.log("fROM CONSTRUCTOR: " + book);
  }
  ngOnInit() {
    //console.log("from on init " + this.book.BookID);
    this.format$ = this.getService.getBookFormat(this.book.BookID);
    this.category$ = this.getService.getBookCategory(this.book.BookID);
    this.author$ = this.getService.getBookAuthor(this.book.BookID);
    this.book$ = this.getService.getBook(this.book.BookID);
    this.bookToCart.BookID = this.book.BookID;
    this.bookToCart.Title = this.book.Title;
    this.bookToCart.ImageLink = this.book.ImageLink;
    this.subscription = this.getService.getBookFormat(this.book.BookID)
    .subscribe(format => {this.bookToCart.price = format[0].Price;
                          this.bookToCart.quantity = format[0].Quantity;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addToCart(book){
  console.log('Book to cart: '+ Object.values(this.bookToCart));
  console.log("adding.." + book.BookID);
  this.cart.addItemsToCart(this.bookToCart);
  const cartTotal: number = localStorage.getItem('selectedProducts')
  ? parseFloat(localStorage.getItem('selectedProductsCount')) : 0;
  this.cartTotal = cartTotal;
  console.log('Cart total in component = ' + this.cartTotal);
  }
}
