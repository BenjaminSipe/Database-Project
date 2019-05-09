import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { Creditcard } from '../creditcard';
import { GETService } from '../services/get.service';
import { Subscription } from 'rxjs';
import { Book } from '../book';
import { Invoice } from '../invoice';
import { POSTService } from '../services/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  user = new User();
  invoice = new Invoice();
  creditCards: Creditcard[] = [];
  books: Book[] = [];
  creditCard: Creditcard;
  subscription: Subscription;
  order;
  productTotal;
  cartTotal;
  discount: boolean;
  selectedProducts;
  firstName;
  lastName;
  showDetails = false;
  cardUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOoO5-jDGtrt4fxCsovzwpK-HvRGFDxm2UTUGwTr2O9U-8LScZ";
  convertedToString: String;
  constructor(private userservice: UserService, private get: GETService,
              private cart: ShoppingCartService, private modalService: NgbModal, private post: POSTService,
              private router: Router) {
    this.user = userservice.user;
    //console.log(this.user);
    this.convertedToString = JSON.stringify(this.user);
    console.log('string:'+this.convertedToString);
    this.selectedProducts = localStorage.getItem('selectedProducts') ? JSON.parse(localStorage.getItem('selectedProducts')) : [];
    if (!userservice.isLoggedIn()) {
      router.navigate(["/login"]);
    }
    let str = this.user.name;
    let newStr = [];
    newStr = str.split(" ");
    this.firstName = newStr[0];
    this.lastName = newStr[1];
    this.subscription = get.getCreditCardByUser(userservice.user.userID).subscribe((obj) => {
      for (let vl of obj) {
        console.log(vl);
        this.creditCards.push(vl);
      }
    });
    }

  ngOnInit() {
    const productTotal: number = localStorage.getItem('productTotal')
    ? parseFloat(localStorage.getItem('productTotal')) : 0;
    this.productTotal = productTotal;
    this.discount = (this.productTotal > 70) ? true : false;
    this.productTotal = (this.productTotal > 70) ? (this.productTotal - (this.productTotal*0.1)) : this.productTotal;
    const cartTotal: number = localStorage.getItem('selectedProducts')
    ? parseFloat(localStorage.getItem('selectedProductsCount')) : 0;
    this.cartTotal = cartTotal;
  }

  placeOrder(order, content, confirm){
    if(!confirm) {
    this.order = order;
    this.modalService.open(content, { centered: true, size: 'lg' });
    } else if (confirm) {
    this.invoice.CardID = order.cardID;
    this.invoice.discount = this.discount ? 10 : 0;
    this.invoice.shippingAddress = this.convertAddress(order);;
    this.invoice.Books = this.getItems();
    //console.log(this.invoice);
    this.post.createInvoice(this.invoice).then((m) => {
    this.modalService.dismissAll();
    this.cart.ClearCart();
    this.router.navigate(['/order-success']);
  }).catch((m) => {
    this.userservice.errorList = m;
    this.modalService.dismissAll();
    this.cart.ClearCart();
    this.router.navigate(['/order-error'])
    //This is where I will tell the user what went wrong.
  });  
  }
  }

  cardDetails(index:number) {
    console.log(index);
    this.creditCard = this.creditCards[index];
    this.showDetails = true;
  }

  getDiscount(){
    //console.log(this.discount);
    return this.discount;
  }
  getProductTotal() {
    return this.productTotal = this.discount ? (this.productTotal - (this.productTotal*0.1)) : this.productTotal;
  }
  getItems(){
    this.selectedProducts.forEach(item => {
      const bookToOrder = {
        BookID: item.BookID,
        FormatID: item.FormatID,
        productCount: item.productCount
      };
      this.books.push(bookToOrder);
  });
    return this.books;
  }

  convertAddress(address){
    let newAddress = '';
    newAddress = address.firstName + ' ' + address.lastName + ' ' + address.address1 + ' ' +
          address.address2 + ' ' + address.city + ' ' + address.state + ' ' + address.zip +
          ' ' + address.phone;
    return newAddress;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
