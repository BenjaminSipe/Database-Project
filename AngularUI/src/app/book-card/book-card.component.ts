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
  outOfStock: boolean;
  cartTotal;
  format$;
  category$;
  publisher$;
  author$;
  book$;
  bookPrice: any;
  subscription : Subscription;
  bookToCart = {
    BookID: "i",
    Title: "",
    ImageLink: "",
    FormatID: "",
    price: 0,
    quantity: 0
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
    .subscribe(format => {this.bookToCart.FormatID = format[0].FormatID,
                          this.bookToCart.price = format[0].Price;
                          this.bookToCart.quantity = format[0].Quantity;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addToCart(book){
  let itemProductCount = 0;
  //console.log('quantity1: ' + this.bookToCart.quantity);
  let selectedProducts = localStorage.getItem('selectedProducts') ?
  JSON.parse(localStorage.getItem('selectedProducts')) : [];
  selectedProducts.map(items => {
    //console.log("items.BookID = " + items.BookID);
    if (items.BookID === this.bookToCart.BookID) {
       itemProductCount = items.productCount;
       itemProductCount +=1;
       //console.log('Product count test: ' + itemProductCount);
    }
  });
  if(itemProductCount > this.bookToCart.quantity){
    this.outOfStock = true;
  } else {
   //console.log('Book to cart: '+ Object.values(this.bookToCart));
   //console.log("adding.." + book.BookID);
   this.cart.addItemsToCart(this.bookToCart);
   const cartTotal: number = localStorage.getItem('selectedProducts')
   ? parseFloat(localStorage.getItem('selectedProductsCount')) : 0;
   this.cartTotal = cartTotal;
   //console.log('quantity2: ' + this.bookToCart.quantity);
   //console.log('Cart total in component = ' + this.cartTotal);
  }
  }
}
